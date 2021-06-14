import React from 'react'
import InfoIcon from '@material-ui/icons/Info';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import './styles.css'



export const Widgets = () => {
 
    const Articulos= (title,subtitle) =>{
        return(
            <div className="widgets__article">   
            <FiberManualRecordIcon/>
            <div className="widgets__lef">

            <div className="widgets__right">


            <h4>{title}</h4>

            <p>{subtitle}</p>

            </div>    
                  
             
            </div>
            </div>        )
    }
    
    
    
    
    return (
        <div className="widgets">
             <div className="widgets__header">

             <h2>Lo mas visto hoy en Skydrow</h2>
             
             <InfoIcon/>
             
             </div>
          {Articulos("BOMBAZO" ,"Messi ficha por el Solea")}
          {Articulos("Sevilla fc desciende","El Real Betis se impone ante su eterno ribal mandandolo al descenso")}
          {Articulos("Lopera vuelve al betis","#fijarzebien")}
        </div>
    )
}
