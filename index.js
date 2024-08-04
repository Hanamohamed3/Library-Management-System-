import express, { json } from 'express'
import userRouter from './src/modules/user/user.router.js'
import bookRouter from './src/modules/book/book.router.js'
import borrowingRouter from './src/modules/borrowing/borrowing.router.js'


const app = express()
const port = 3000

app.use(json())
app.use('/users',userRouter)
app.use('/books',bookRouter)
app.use('/borrowings', borrowingRouter);


app.get('/', (req, res) => res.send('Hello World!'))



app.listen(port, () => console.log(`Example app listening at http://localhost:3000`))