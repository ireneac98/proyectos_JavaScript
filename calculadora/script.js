//Creamos las constantes para llamar a los elementos del HTML
const botonNumero = document.querySelectorAll('[data-numero]')
const botonOperador = document.querySelectorAll('[data-operador]')
const botonIgual = document.querySelector('[data-igual]')
const botonBorrar = document.querySelector('[data-borrar]')
const botonBorrarTodo = document.querySelector('[data-borrar-todo]')
const textoValorSuperior = document.querySelector('[data-valor-superior]')
const textoValorInferior = document.querySelector('[data-valor-inferior]')

//Creamos la clase Calculadora con sus constructores correspondientes
class Calculadora {
    constructor(textoValorInferior, textoValorSuperior) {
        this.textoValorInferior = textoValorInferior
        this.textoValorSuperior = textoValorSuperior
        this.valorInferior = ''
        this.valorSuperior = ''
        this.operador = undefined
    }

    //Añadimos el método agregarNumero
    agregarNumero(numero) {
        if (numero === '.' && this.valorInferior.includes('.')) return   
        this.valorInferior = this.valorInferior + numero
    }
    //Añadimos el método imprimirDisplay
    imprimirDisplay() {
        this.textoValorInferior.innerText = this.valorInferior
        this.textoValorSuperior.innerText = this.valorSuperior
    }
    //Añadimos el método borrar
    borrarDEL(){
        this.valorInferior = this.valorInferior.slice(0, -1)
    }

    //Añadimos el método elegirOperacion
    elegirOperacion(operador) {
        if(this.valorInferior == '') return
        if(this.valorSuperior != '') {
            this.realizarCalculo()
        }

        this.operador = operador
        this.valorSuperior = this.valorInferior
        this.valorInferior = ''
    }
    //Añadimos el método realizarCalculo
    realizarCalculo(){
        let resultado 
        let conversionValorSuperior = parseFloat(this.valorSuperior)
        let conversionValorInferior = parseFloat(this.valorInferior)

        if(isNaN(conversionValorSuperior) || isNaN(conversionValorInferior)) return

        switch(this.operador) {
            case '+':
                resultado = conversionValorSuperior + conversionValorInferior
                break
            case '-':
                resultado = conversionValorSuperior - conversionValorInferior
                break
            case '*':
                resultado = conversionValorSuperior * conversionValorInferior
                break
            case '÷':
                resultado = conversionValorSuperior / conversionValorInferior
                break
                default: return
        }

        this.valorInferior = resultado
        this.operador = undefined
        this.valorSuperior = ''
    }

    //Añadimos el método borrarAC
    borrarAC(){
        this.valorInferior = ''
        this.valorSuperior = ''
        this.operador = undefined
    }

    
}
//Llamamos a la clase calculadora
const calculadora = new Calculadora (textoValorInferior, textoValorSuperior)


//Creamos el método botonNumero con el que detectará los botones cuando hagamos click
botonNumero.forEach(boton => {
    boton.addEventListener('click', () => {
        calculadora.agregarNumero(boton.innerText)
        calculadora.imprimirDisplay()
    })
})

//Creamos el método botonBorrar que usaremos para darle funcionalidad a el botón DEL
botonBorrar.addEventListener('click', () => {
    calculadora.borrarDEL()
    calculadora.imprimirDisplay()
})

//Creamos el método botonOperador para darle funcionalidad a los botones para realizar operaciones
botonOperador.forEach(boton => {
    boton.addEventListener('click', () => {
        calculadora.elegirOperacion(boton.innerText)
        calculadora.imprimirDisplay()
    })
})

//Creamos el método botonIgual para darle funcionalidad al botón igual de la calculadora
botonIgual.addEventListener('click', () => {
    calculadora.realizarCalculo()
    calculadora.imprimirDisplay()
})

//Creamos el método botonBorrarTodo para darle funcionalidad al botón AC 
botonBorrarTodo.addEventListener('click', () => {
    calculadora.borrarAC()
    calculadora.imprimirDisplay()
})