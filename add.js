const bcrypt = require('bcrypt');

// bcrypt.hash("Mb_Films@Kheni", 10, (err, hash) => {
//     console.log(hash);
// });
// bcrypt.hash("RuttvikKheni@DevMode", 10, (err, hash) => {
//     console.log(hash);
// });

bcrypt.hash("123", 10, (err, hash) => {
    console.log(hash);
});