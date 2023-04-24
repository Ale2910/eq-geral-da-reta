
function calc (ponto1, ponto2) {

    //? Pegando os pontos
    let x2 = ponto2.split(',')[0]
    let x1 = ponto1.split(',')[0]
    
    let y1 = ponto1.split(',')[1]
    let y2 = ponto2.split(',')[1]
    
    // Mexendo com os sinais
    let res1 = `m = y2-y1 / x2-x1`
    let res2 = ''
    let res3 = ''

    let Y1 = ''
    let X1 = ''

    if(!String(y1).includes('-')) {
        res2 = `m = ${y2}-${y1} / `
        res3 = `m = ${y2}-${y1} / `
        Y1 = `-${y1}`
        if(Y1 === '-0') Y1 = ''
    } else {
        res2 = `m = ${y2}-(${y1}) / `
        res3 = `m = ${y2}+${eval(-(y1))} / `
        if(Y1 === '+0') Y1 = ''
    }

    if(!String(x1).includes('-')) {
        res2 += `${x2}-${x1}`
        res3 += `${x2}-${x1}`
        X1 = `-${x1}`
        if(X1 === '-0') X1 = ''
    } else {
        res2 += `${x2}-(${x1})`
        res3 += `${x2}+${eval(-(x1))}`
        X1 = `+${eval(-(x1))}`
        if(X1 === '+0') X1 = ''
    }

    // Pra não repetir a mesma coisa
    if(res2 === res3) res2 = ''

    // Pegando o M
    let pegarM = res3.replace('m = ', '').split(' / ')
    let res4 = `m = ${eval(pegarM[0])}/${eval(pegarM[1])}`
    let val4 = res4.replace('m = ', '')
    let m = ''

    if(parseInt(eval(val4)) === eval(val4)) {
        m = `m = ${eval(res4)}/1`
    } else {
        m = `${res4}`
    }
    

    // Pra não repetir a mesma coisa
    if(res4 === m) res4 = ''


    // Multiplicando cruzado
    let valM = m.replace('m = ', '')

    let res5 = `m = y-y1 / x-x1`
    let res6 = `${valM} = y${Y1} / x${X1}`
    
    //
    let splitValM = valM.split('/')

    let res7 = `${splitValM[1]}(y${Y1}) = ${splitValM[0]}(x${X1})`


    // Transformando 1y em y e fazendo a conta cruzada
    let esquerda = `${splitValM[1]}y@`
    if(esquerda.includes('1y')) esquerda = esquerda.replace('1y', 'y') 
    if(!Y1) {
    } else {
        esquerda += splitValM[1] * Y1
    }

    let direita = `${splitValM[0]}x#`
    if(direita.includes('1x')) direita = direita.replace('1x', 'x')
    if(!X1) {
    } else {
        direita += splitValM[0] * X1

        let verify = direita.replace('x', 'x@').split('@')
        if(!verify[1].includes('-')) {
            verify[1] = `+${verify[1]}`
            direita = verify.join('')
        }
    }


    let res8 = `${esquerda} = ${direita}`

    
    // Passando o num diferente pro lado direito da igualdade e fazendo a conta
    let verify = esquerda.split('@')
    esquerda = verify[0]
    verify = verify[1]

    
    if(String(verify).includes('-')) {
        verify = '#' + verify.replace('-', '+')
    } else {
        verify = '#' + verify.replace('+', '-')
    }

    direita = `${direita}${verify}`

    let res9 = `${esquerda} = ${direita}`


    let a = direita.split('#')
    let res10 = ''

    if(a.length === 3 && a[1] !== '') {
        let b = eval(a[1])
        direita = a[0] + b
    
        res10 = `${esquerda} = ${direita}`
    }


    //? Formando a resposta
    let res = `Pegando o M:
${res1}
@${res2}
${res3}
@${res4}
${m}

Multiplicando cruzado:
${res5}
${res6}
${res7}
${res8}

Terminando a conta:
${res9}
@${res10}

`.trim().replaceAll(`@
`, '').replaceAll('@', '').replaceAll('#', '')
// Tirando os espaços vazios e o # que é usado em certa parte do código mas que não é pra aparecer aqui

    console.log(res)
}



calc('0,1', '1,0')

/*
? '2,5', '1,3' // y = 2x+1
? '0,1', '1,0' // y = -x+1
'-3,29', '2,4'
'-2,-2', '3,3'
*/
