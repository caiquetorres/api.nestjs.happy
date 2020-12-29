const path = require('path')

module.exports = {
    type: 'sqlite',
    database: './src/database/database.sqlite',
    synchronize: true,
    logging: true,
    entities: [
        path.join(__dirname, 'dist', '**', '**', 'entities', '*.entity.js')
    ]
}
