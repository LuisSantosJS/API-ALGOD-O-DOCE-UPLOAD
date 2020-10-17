const express = require('express');
const celebrate = require('celebrate');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 4444;
const app = express();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, 'src', 'uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + file.originalname)
    }
});

const upload = multer({ storage })

app.use(express.json());

app.use(cors());



app.post('/upload/anexo', upload.single('anexo'), (req, res) => {
    res.json({ message: 'success', res: 'https://api-upload-algo-doce.herokuapp.com/uploads/' + req.file.fieldname + '-' + req.file.originalname + '' })
})


app.use('/uploads', express.static(path.resolve(__dirname, 'src', 'uploads')));

app.use(celebrate.errors());

app.listen(port, () => console.log('server running', port))