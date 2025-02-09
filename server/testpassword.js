const bcrypt = require('bcrypt');

const plainPassword = "12345"; // Replace with the password you're testing
const hashedPassword = "$2b$10$/B0Ppsbw2C68voNwwFKJG.vKlyWa1XQyWPd.CLT50.PN2bOQJkDLK"; // Your stored password hash

bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
    if (err) {
        console.error("Error comparing passwords:", err);
    } else {
        console.log("Password match:", result); // Should print true if it matches
    }
});
