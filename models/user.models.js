import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "Email already exists"],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [3, "Minimum password length is 3 characters"],
        select: false
    },
    cp: {
        type: String,
        required: [true, "Please confirm your password"],
        minlength: [3, "Minimum password length is 3 characters"],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords do not match"
        }
    },
    createdAt: Date,
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["user", "admin", "super-admin"],
        default: "user"
    }
});

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, 10);
        this.cp = undefined;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.matchPassword = async function (password, textPassword) {
    try {
        return await bcrypt.compare(password, textPassword);
    } catch (error) {
        next(error);
    }
}

userSchema.methods.changedPass = function (jwt_ts) {
    if (this.createdAt) {
        const changedTimestamp = parseInt(this.createdAt.getTime() / 1000, 10);
        return jwt_ts < changedTimestamp;
    }
    return false;
}

const User = model("User", userSchema);

export default User;