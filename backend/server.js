
const express = require('express')
const cors = require('cors');
const app = express()

const userRouter = require('./src/router/userRouter')
const departamentsRouter = require('./src/router/departmentRouter')
const itensRouter = require('./src/router/itemRouter')
const categoryRouter = require('./src/router/categoryRouter')
const movimentRouter = require('./src/router/movementRouter')
const emprestimoRouter = require('./src/router/emprestimoRouter')
const funcionarioRouter = require('./src/router/funcionarioRouter')


app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(departamentsRouter);
app.use(itensRouter);
app.use(categoryRouter)
app.use(movimentRouter)
app.use(emprestimoRouter)
app.use(funcionarioRouter)

app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: 'Servidor rodando com sucesso',
        porta: 1050,
        status: 'online'
    });
});

app.listen(1050,()=>{
     console.log('Servidor rodando na porta 1050');
     
})