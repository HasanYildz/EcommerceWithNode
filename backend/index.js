const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// DATABASE

mongoose.connect("mongodb+srv://hasanbaba:user1234@cluster0.6pilohq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});

// Visitor Schema
const visitorSchema = new mongoose.Schema({
    totalVisitors: {
        type: Number,
        default: 0
    },
    onlineUsers: {
        type: Number,
        default: 0
    }
});

const Visitor = mongoose.model('Visitor', visitorSchema);

// Increment online users middleware
const incrementOnlineUsers = async (req, res, next) => {
    try {
        let visitors = await Visitor.findOne();
        if (!visitors) {
            visitors = new Visitor();
        }
        visitors.onlineUsers += 1;
        await visitors.save();
        req.visitor = visitors; // to use in decrement middleware
        next();
    } catch (error) {
        console.error("Error incrementing online users:", error);
        next(error);
    }
};

// Decrement online users middleware
const decrementOnlineUsers = async (req, res, next) => {
    try {
        if (req.visitor) {
            req.visitor.onlineUsers -= 1;
            await req.visitor.save();
        }
        next();
    } catch (error) {
        console.error("Error decrementing online users:", error);
        next(error);
    }
};

// Increment online users for every request
app.use(incrementOnlineUsers);

// Decrement online users when response finishes
app.use((req, res, next) => {
    res.on('finish', () => {
        decrementOnlineUsers(req, res, next);
    });
    next();
});

// Increment total visitors middleware
const incrementTotalVisitors = async (req, res, next) => {
    try {
        let visitors = await Visitor.findOne();
        if (!visitors) {
            visitors = new Visitor();
        }
        visitors.totalVisitors += 1;
        await visitors.save();
        next();
    } catch (error) {
        console.error("Error incrementing total visitors:", error);
        next(error);
    }
};

// Home route with total visitors increment
app.get('/', incrementTotalVisitors, (req, res) => {
    res.send("Express App is running");
});

// Endpoint to get visitor data
app.get('/visitors', async (req, res) => {
    try {
        let visitors = await Visitor.findOne();
        if (!visitors) {
            visitors = new Visitor();
            await visitors.save();
        }
        res.json({
            totalVisitors: visitors.totalVisitors,
            onlineUsers: visitors.onlineUsers
        });
    } catch (error) {
        console.error("Error fetching visitor data:", error);
        res.status(500).send({ error: "An error occurred while fetching visitor data" });
    }
});

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "upload/images");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Image Storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Upload Endpoint
app.use("/images", express.static(uploadDir));
app.post("/upload", upload.single("product"), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema for creating products
const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

const Product = mongoose.model("Product", productSchema);

app.post('/addproduct', async (req, res) => {
    try {
        let lastProduct = await Product.findOne().sort({ id: -1 });
        let id = lastProduct ? lastProduct.id + 1 : 1;

        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save();
        console.log("Product saved");

        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send({ error: "An error occurred while adding the product" });
    }
});

// Remove product endpoint
app.post("/removeproduct", async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Product removed");
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).send({ error: "An error occurred while removing the product" });
    }
});

// Fetch all products endpoint
app.get('/allproducts', async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("All products fetched");
        res.status(200).send(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send({ error: "An error occurred while fetching products" });
    }
});

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

// Signup endpoint
app.post("/signup", async (req, res) => {
    try {
        let check = await User.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "This email is already registered" });
        }

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const user = new User({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });

        await user.save();

        const data = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(data, "secret_ecom");
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errors: "Internal Server Error" });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            const passMatch = req.body.password === user.password;
            if (passMatch) {
                const data = {
                    user: {
                        id: user.id
                    }
                };
                const token = jwt.sign(data, 'secret_ecom');
                res.json({ success: true, token });
            } else {
                res.json({ success: false, errors: "Wrong Password" });
            }
        } else {
            res.json({ success: false, errors: "Wrong Email address" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ error: "An error occurred during login" });
    }
});

// Latest products endpoint
app.get("/newcollections", async (req, res) => {
    try {
        let products = await Product.find({});
        let newcollection = products.slice(-8); // Correct slice usage
        console.log("Newcollection Fetched");
        res.send(newcollection);
    } catch (error) {
        console.error("Error fetching new collections:", error);
        res.status(500).send({ error: "An error occurred while fetching new collections" });
    }
})

// Popular products endpoint
app.get("/popularproducts", async (req, res) => {
    try {
        let products = await Product.find({ category: "men" });
        let popularproducts = products.slice(0, 4);
        console.log("Popular products Fetched");
        res.send(popularproducts);
    } catch (error) {
        console.error("Error fetching popular products:", error);
        res.status(500).send({ error: "An error occurred while fetching popular products" });
    }
})

// Fetch user middleware
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid login" });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "please authenticate using a valid token" });
        }
    }
}

// Add to cart endpoint
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added", req.body.itemId)
    let userData = await User.findOne({ _id: req.user.id })
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added");
})

// Remove from cart endpoint
app.post("/removefromcart", fetchUser, async (req, res) => {
    console.log("Removed", req.body.itemId)
    let userData = await User.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
        await User.findOneAndUpdate(
            { _id: req.user.id },
            { cartData: userData.cartData }
        );
    }
    res.send("Removed");
});

// Get cart endpoint
app.post('/getcart', fetchUser, async (req, res) => {
    console.log('Get cart');
    let userData = await User.findOne({ _id: req.user.id });
    res.json(userData.cartData);
});

app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on port " + port);
    } else {
        console.log("Error: " + error);
    }
});
