import { Router, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { WeatherProvider, WttrObject } from '../interfaces';
import { TYPES } from '../types';

@injectable()
export class WeatherController{
    
    /*
    * Cette classe contient deux propriétés:
    *   _weatherService: service qui permet d'obtenir la météo d'une ville, voir l'interface WeatherProvider
    *   _defaultLocation: ville par défaut utilisée par le serveur si le client ne fourni pas de ville
    */
    public constructor(@inject(TYPES.WeatherService) private _weatherService: WeatherProvider,
                                                     private _defaultLocation = 'Montreal'){ /* empty */}


    public get router() : Router {
        /*
        * Un Router est un regroupement isolé de middlewares.
        * Ce Router est associé à la route /weather.
        * https://expressjs.com/en/4x/api.html#router
        */
        const router: Router = Router();
        /*
        * GET /weather/
        * http://localhost:8000/weather/
        */

        //TODO Ajouter les routes de votre application
        //     Utilisez router.METHOD au lieu de app.METHOD
        router.get('/',async (req:Request, res: Response) => {
            //la variable wttrInfo contient la météo de Montréal (ville par défaut)
            let wttrInfo: WttrObject;
        
            const location = String(req.query.location);
            const interval = String(req.query.interval);
            //location recherché manuellement
            if(location !== 'undefined'){
                wttrInfo = await this._weatherService.readWeather(location);
                //onglet hourly 
                if(interval !== 'undefined'){
                
                    res.render('index2',{data: wttrInfo, view: 'byhour',location:location});  
                }else{

                    res.render('index',{data: wttrInfo ,location:location });
                }
            //conditions actuelles pour la ville par defaut 
            }else{
                wttrInfo = await this._weatherService.readWeather(this._defaultLocation);
                res.render('index',{data: wttrInfo ,location:this._defaultLocation}); 
            }
        });

        router.get('/now',async (req:Request, res: Response) => {
            const location = String(req.query.location);
            let wttrInfo: WttrObject;

            if(location !== 'undefined'){
                wttrInfo = await this._weatherService.readWeather(location);

                res.render('index', {data: wttrInfo, view: 'actuel',location:location});
            }else{
                wttrInfo = await this._weatherService.readWeather(this._defaultLocation);
                res.render('index', {data: wttrInfo, view: 'actuel',location:this._defaultLocation});
            }
        });


        router.get('/hourly',async (req:Request, res: Response) => {
            
            const location = String(req.query.location);
            let wttrInfo: WttrObject;
        
            if(location !== 'undefined'){
                wttrInfo = await this._weatherService.readWeather(location);

                res.render('index2',{data: wttrInfo, view: 'byhour',location:location});
            }else{
                wttrInfo = await this._weatherService.readWeather(this._defaultLocation);

                res.render('index2',{data: wttrInfo, view: 'byhour',location:this._defaultLocation});
            }
        });
        
        return router;
    }

}

