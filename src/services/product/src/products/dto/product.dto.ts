import {
    IsEmail,
    IsNotEmpty,
    MaxLength,
    MinLength,
    Min
  } from 'class-validator';
export class CreateProductDto {
    @IsNotEmpty({
        message: 'Informe um valor do produto',
      })
      @Min(1, {
        message: 'O valor do produto deve ser maior que 0',
      })
      value: number;
    
      @IsNotEmpty({
        message: 'Informe a quantidade do produto',
      })
      amount: number;


      @IsNotEmpty({
        message: 'Informe o nome do produto',
      })
      @MaxLength(200, {
        message: 'O nome deve ter menos de 200 caracteres',
      })
      name: string;

      @MaxLength(500, {
        message: 'A imagem deve ter menos de 200 caracteres',
      })
      image: string;
    
      @IsNotEmpty({
        message: 'Informe o ID do estabelecimento',
      })
      @MaxLength(200, {
        message: 'O ID do Estabelecimento deve ter menos de 200 caracteres',
      })
      IdEstablishment: string
  }