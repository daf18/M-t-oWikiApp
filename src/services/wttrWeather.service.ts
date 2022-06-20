// eslint-disable-next-line @typescript-eslint/no-var-requires
import { WeatherProvider, WttrObject } from '../interfaces';
import { injectable } from 'inversify';
import fetch from 'node-fetch';


@injectable()
/*
* Cette classe a comme rôle de fournir la météo pour une
* ville demandée. Elle s'utilise comme le staticWeatherService.
* Cette classe fait la communication avec l'API de wttr
* les informations de météorologique sont donc réelles.
*/
export class wttrWeatherService implements WeatherProvider{
    constructor(){
        //empty
    }

    async readWeather(location: string): Promise<WttrObject> {
        //throw new Error('Vous devez compléter le wttrWeatherService.ts');
        const response = await fetch('https://wttr.in/'+location+'?format=j1');
        const meteo: WttrObject = await response.json();
        return meteo;
        //TODO Faire une requête GET vers l'api de wttr.in pour obtenir la météo de <location>
        //Vous pouvez utiliser node-fetch pour faire la requête.
    }

}