import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import axios, { AxiosError, AxiosResponse } from 'axios';
@Injectable()
export class AfiliadosSearchService {

    private readonly afiliadosURI = 'https://bolsadetrabajo.cmicservicios.com/api/common/buscarafiliado/?num=';


    async search(num: string): Promise<any> {
        try {
          const uri = this.afiliadosURI + num;
    
          const { data }: AxiosResponse<any> = await axios.get(uri);
          return data;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if(error.response.status ===  (400 || 404)  ){
                throw new NotFoundException(error.response?.data)
            }else{
                throw new InternalServerErrorException(error.response?.data)
            }
          } else {
            console.error('Unexpected error:', error);
            throw new InternalServerErrorException(error)
          }
        }
      }

      async searchExpress(num: string): Promise<any> {
        const uri = this.afiliadosURI + num;
        return await axios.get(uri);
      }
}
    
