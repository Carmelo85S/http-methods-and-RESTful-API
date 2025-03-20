import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

//create a list of user
let user = [
    {
        id: 1,
        name: "Carmelo",
        nationality: "ITA"
    },
    {
        id: 2,
        name: "Angelica",
        nationality: "SWE"
    }
]

//get the user
app.get("/user", (req, res) => {
    res.json(user)
})

//add user
app.post("/user", (req, res) => {
    const newUser = {
        id: user.length + 1,
        name: req.body.name,
        nationality: req.body.nationality,
    }
    user.push(newUser)
    res.json({message: "User added succesfully: ", newUser})
})

// Update user
app.put("/user/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const foundUser = user.find((u) => u.id === userId);

    if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
    }

    foundUser.name = req.body.name || foundUser.name;
    foundUser.nationality = req.body.nationality || foundUser.nationality;

    res.json({ message: "User updated successfully", updatedUser: foundUser });
});

//delete user
app.delete("/user/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    user = user.filter((u) => u.id !== userId);
    res.json({ message: "User deleted successfully" });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})