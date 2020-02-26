import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[mask]', //seletor utilizado nos inputs para chamar a classe da diretiva
    //ex.: <input mask = "###.###.###-##">para criar a mascara permitida para o cpf
})
export class MaskDirective {
    @Input('mask') mask: string; //aqui a variável mask do tipo string recebe o valor digitado no input

    constructor(private element: ElementRef) { //retorna o valor do input para armazenar na variável acima

    }

    @HostListener('input', ['$event']) onInputChange(event) { //este evento escuta o input para ver se houve mudança
        //caso o evento do input seja do tipo deletar conteúdo apenas retorna o conteúdo
        if (event.inputType == 'deleteContentBackward')
            return;

        const initalValue = this.element.nativeElement.value;
        initalValue.replace(/[^0-9]*/g, ''); //RegExp JS para verificar se o valor inicial digitado é de 0 a 9
        if (initalValue !== this.element.nativeElement.value) {
            event.stopPropagation();//se estiver dentro do padrão do RegExp encerra o evento
        }

        this.element.nativeElement.value = this.format(this.mask, initalValue); //aplica o formato do cpf
    }

    format(mask: string, value: any): string {
        let text = '';
        let data = value;
        let c, m, i, x;

        for (i = 0, x = 1; x && i < mask.length; ++i) {
            c = data.charAt(i);
            m = mask.charAt(i);

            switch (mask.charAt(i)) {
                case '#': //se na mascara chamada no input utilizarmos # ele permitira somente numeros
                    if (/\d/.test(c)) {
                        text += c;
                    } else {
                        x = 0;
                    }
                    break;

                case 'A': //se na mascara chamada no input utilizarmos A ele permitira letras de A a Z
                    if (/[a-z]/i.test(c)) {
                        text += c;
                    } else {
                        x = 0;

                    }
                    break;

                case 'N': //se na mascara chamada no input utilizarmos N ele permitira letras de A a Z e numeros de 0 a 9
                    if (/[a-z0-9]/i.test(c)) {
                        text += c;
                    } else {
                        x = 0;
                    }
                    break;

                case 'X': //se na mascara chamada no input utilizarmos X ele permitira qualquer texto
                    text += c;
                    break;

                default:
                    text += m;
                    break;
            }
        }
        return text;
    }
}