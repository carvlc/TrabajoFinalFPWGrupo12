import Phaser from "phaser";
import { useState, useEffect } from "react";
import Menu from "./scenesDude/Menu";
import Nivel1 from "./scenesDude/Nivel1";
import Nivel2 from "./scenesDude/Nivel2";
import Nivel3 from "./scenesDude/Nivel3";
import Nivel4 from "./scenesDude/Nivel4";
import GameOver from "./scenesDude/GameOver";
import Win from "./scenesDude/Win";

function AppJuegoDude(){

    const Escenas = [Menu, Nivel1, Nivel2,Nivel3, Nivel4, GameOver, Win];
    const crearEscena = Scene => new Scene();
    const iniciarEscena = () => Escenas.map(crearEscena);
        
    const [listo, setListo] = useState(false);

    useEffect(() => {

        //variables de configuracion
        let config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
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

    }, [listo]);    
}

export default AppJuegoDude;