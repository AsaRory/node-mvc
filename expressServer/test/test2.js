function f(num) {
    let num1 = num/10;
    const num2 = num%10;
    if(num1<1){
        return num
    }else{
        num1 = Math.floor(num1);
        return `${num2}${f(num1)}`
    }
}

console.log('f=',f(2048222));