import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const app = express();
const PORT = 3000;

app.use(express.json());

const swaggerOption = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: "User API",
            version: "1.0.0",
            description: "A simple Express user API"
        },
    },
    apis: ["./server.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

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

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieves a list of all users
 *     description: Retrieves a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   nationality:
 *                     type: string
 */

//get the user
app.get("/user", (req, res) => {
    res.json(user)
})

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Add a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - nationality
 *             properties:
 *               name:
 *                 type: string
 *               nationality:
 *                 type: string
 *     responses:
 *       200:
 *         description: User added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 nationality:
 *                   type: string
 */


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
/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               nationality:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedUser:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     nationality:
 *                       type: string
 *             example:
 *               message: "User updated successfully"
 *               updatedUser:
 *                 id: 1
 *                 name: "Never Moore"
 *                 nationality: "USA"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "User not found"
 */

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


/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
//delete user
app.delete("/user/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    user = user.filter((u) => u.id !== userId);
    res.json({ message: "User deleted successfully" });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})