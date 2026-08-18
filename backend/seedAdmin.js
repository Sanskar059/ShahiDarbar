import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    const email = "admin@shahidarbar.com";
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists. Deleting existing admin...");
      await User.deleteOne({ email });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("adminpassword123", salt);

    const admin = new User({
      name: "Demo Admin",
      email,
      password: hashedPassword,
      isAdmin: true,
    });

    await admin.save();
    console.log("✅ Admin user created successfully!");
    console.log("ID/Email: admin@shahidarbar.com");
    console.log("Password: adminpassword123");

    process.exit();
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
