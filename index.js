const express = require("express")
const path = require("path")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const cors = require('cors');
const helmet = require("helmet")
const ExpressError = require("./utils/expressError")
require('dotenv').config();

const app = express()

const db_url = process.env.DB_URL
const mongoose = require('mongoose');
mongoose.connect(db_url);
const User = require("./modules/User")
const Book = require("./modules/Book")
const MongoStore = require('connect-mongo');

app.use(cors())
app.use(helmet())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session({secret: process.env.SECRET, resave: false, saveUninitialized: true, cookie: {httpOnly: true, expires: Date.now() + 1000 * 60 * 60 * 24 * 7, maxAge: 1000 * 60 * 60 * 24 * 7}, store: MongoStore.create({ mongoUrl: db_url, touchAfter: 24 * 60 * 60})}))


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const isLoggedIn = async (req, res, next) => {
    if(req.isAuthenticated()) {
        next()
    } else {
        res.redirect("/login")
    }
}

app.get("/api/books", async (req, res, next) => {
    try {
        const books = await Book.find({}).populate("auth")
        res.json({books: books})
    } catch(err) {
        next(err)
    }
})

app.post("/api/book/new", isLoggedIn, async (req, res, next) => {
    try{
        const {bookName, bookContent} = req.body
        const book = new Book({bookName, bookContent})
        book.auth = req.user
        req.user.books.push(book)
        await book.save()
        await req.user.save()
        res.redirect("/")
    } catch(err) {
        next(err)
    }
})

app.get("/api/book/delete/:id", isLoggedIn, async (req, res, next) => {
    try{
        const {id} = req.params
        const book = await Book.findById(id).populate("auth")
        if(req.user.username === book.auth.username) {
            await Book.findByIdAndDelete(id)
            res.redirect("/")
        } else {
            throw new ExpressError("You dont have permissions to do that.", 500)
        }
        
    } catch(err) {
        next(err)
    }
})

app.get("/api/book/edit/:id", isLoggedIn, async (req, res, next) => {
    try {
        const {id} = req.params
        const book = await Book.findById(id)
        res.json({url: `/book/edit/${book._id}?bookName=${book.bookName}&bookContent=${book.bookContent}`})
    } catch(err) {
        next(err)
    }
})

app.post("/api/book/edit/:id", isLoggedIn, async (req, res, next) => {
    try {
        const { updatedBookContent} = req.body
        const {id} = req.params
        const updatedBook = await Book.findByIdAndUpdate(id, {bookContent: updatedBookContent})
        res.redirect('/')
    } catch(err) {
        next(err)
    }
})

app.get("/api/book/addToFav/:id", isLoggedIn, async (req, res, next) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        const populatedBooks = await req.user.populate("favBooks")
        populatedBooks.favBooks.map(async (b) => {
            if(book.bookName === b.bookName) {
                next(new ExpressError("You cant add the same book to your favorites.", 400))
            } else {
                req.user.favBooks.push(book)
                await req.user.save()
                res.redirect("/")
            }
        })
    } catch(err) {
        next(err)
    }
    
})

app.get("/api/book/removeFromFav/:id", isLoggedIn, async (req, res, next) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        if(book.bookName === "Welcome !") {
            throw new ExpressError("You cant remove this book.", 400)
        }
        const user = await User.updateOne({username: req.user.username}, {$pull: {favBooks: id}})
        res.redirect("/book/fav")
    } catch(err) {
        next(err)
    }
})

app.get("/api/book/:id", async (req, res, next) => {
    try {
        const {id} = req.params
        const book = await Book.findById(id)
        res.json({book})
    } catch(err) {
        next(err)
    }
})

app.get("/api/books/fav", async (req, res, next) => {
    try {
        const favBooks = await req.user.populate("favBooks")
        res.json({books: favBooks.favBooks})
    } catch(err) {
        next(err)
    }
})

app.get("/api/mybooks", isLoggedIn, async (req, res, next) => {
    try {
        const populatedBooks = await req.user.populate("books")
        if(populatedBooks.books.length === 0) {
            res.json({noBooks: true})
        }
        res.json({books: populatedBooks.books})
    } catch(err) {
        next(err)
    }
})

app.get("/api/userInfo", isLoggedIn, (req, res) => {
    const user = req.user
    res.json({user})
})

app.post("/api/register", async (req, res, next) => {
    try {
        const {username, email, password} = req.body
        const user = new User({email, username})
        const newUser = await User.register(user, password)
        const defaultFavBook = await Book.findOne({bookName: "Welcome !"})
        req.login(newUser, function(err) {
                if (err) {
                    console.log(err);
                }
            }
        );
        newUser.favBooks.push(defaultFavBook)
        await newUser.save()
        res.redirect("/")
    } catch(err) {
        next(err)
    }
})

app.post("/api/login", passport.authenticate('local', { failureRedirect: 'https://mongoosejs.com' }), (req, res) => {
    res.redirect("/")
})


app.get("/api/logout",isLoggedIn, (req, res) => {
    req.logOut()
    req.session.destroy(err => {
        if (err) return next(err)
      })
      res.clearCookie('connect.sid');
    res.redirect("/")
})

app.post("/api/isLoggedIn", (req, res) => {
    try {
        if(req.isAuthenticated()) {
            res.json({isLoggedIn: true})
        } else {
            res.json({isLoggedIn: false})
        }
    } catch(err) {
        next(err)
    }
})

app.get("/api/isAuth/:id", isLoggedIn, async (req, res, next) => {
    try {
        const {id} = req.params
        const book = await Book.findById(id).populate("auth")
        console.log(book.auth)
        if(req.user.username === book.auth.username) {
            res.json({isAuth: true})
        } else {
            res.json({isAuth: false})
        }
    } catch(err) {
        next(err)
    }
})

app.use((err, req, res, next) => {
    const { message, status } = err
    const error = message || err
    res.status(status)
    res.redirect(`/error/Page?errorContent=${error}`)
})

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")))

    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname,  "/client", "build", "index.html"))
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`working on port ${port}`)
})