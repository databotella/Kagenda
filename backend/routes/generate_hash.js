const bcrypt = require('bcrypt');

const generateHash = async () => {
    const password = 'senhaSegura'; // Substitua pela senha desejada
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Senha hash:', hashedPassword);
};

generateHash();
