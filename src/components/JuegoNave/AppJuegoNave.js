import Phaser from "phaser";
import {useState,useEffect} from "react";

import GameOver from "./scenesNave/GameOver";
import Boss from "./scenesNave/Boss";
import Menu from "./scenesNave/Menu";
import Nivel1 from "./scenesNave/Nivel1";
import Nivel2 from "./scenesNave/Nivel2";
import Nivel3 from "./scenesNave/Nivel3";
import Win from "./scenesNave/Win";

function AppJuegoNave(){
    const Escenas = [Menu, Nivel1, Nivel2,Nivel3,Boss, GameOver, Win];
    const crearEscena = Scene => new Scene();
    const iniciarEscena = () => Escenas.map(crearEscena);
    const [listo, setListo]= useState(false);
    useEffect(()=>{
        let config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            },
            scene: iniciarEscena()
        };
        let game = new Phaser.Game(config)
        game.events.on("LISTO", setListo)
    
        return () => {
            setListo(false);
            game.destroy(true);
        }
    },[listo])
 
}
export default AppJuegoNave;