import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/Services/spotify.service';

@Component({
  selector: 'app-guess-game',
  templateUrl: './guess-game.component.component.html',
  styleUrls: ['./guess-game.component.component.scss'],
})
export class GuessGameComponent implements OnInit {
  score: number = 0;
  songId: string = '';
  options: string[] = [];
  currentSongName: string = '';
  gameOver: boolean = false;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.startNewRound();
  }

  startNewRound() {
    this.getSong();
  }

  getSong() {
    this.spotifyService.getRandomSong().subscribe(song => {
      console.log('Canción recibida:', song);

      // Verificamos si la canción tiene un URI válido
      if (song && song.id) {
        // Usamos el URI de la canción para reproducirla directamente
        this.songId = song.id; // Usamos 'uri' en lugar de 'id' para el track de Spotify
        console.log('URI de la canción:', this.songId);

        this.currentSongName = song.name;

        // Generamos las opciones incorrectas y las mezclamos
        this.generateWrongOptions(song.name);
      } else {
        console.log('Canción sin URI, buscando otra...');
        this.getSong(); // Llamada recursiva hasta que tenga URI
      }
    });
  }

  // Obtener canciones aleatorias para las opciones incorrectas
  generateWrongOptions(correctAnswer: string) {
    const wrongOptions: string[] = [];
    const wrongSongs: Set<string> = new Set(); // Usamos un Set para evitar duplicados
    
    // Crear un bucle que sigue pidiendo canciones hasta tener suficientes opciones
    const getMoreSongs = () => {
      this.spotifyService.getRandomSong().subscribe(wrongOption => {
        if (wrongOption && wrongOption.name !== correctAnswer && !wrongSongs.has(wrongOption.name)) {
          wrongSongs.add(wrongOption.name);
          wrongOptions.push(wrongOption.name);
        }
  
        // Si ya tenemos 3 canciones incorrectas, terminamos
        if (wrongOptions.length === 3) {
          this.options = [...wrongOptions, correctAnswer]; // Añadimos la respuesta correcta
          this.shuffleOptions();
        } else {
          getMoreSongs(); // Llamamos recursivamente para obtener más canciones si no tenemos 3
        }
      });
    };
  
    // Iniciar el proceso de obtención de canciones
    getMoreSongs();
  }

  shuffleOptions() {
    this.options = this.options.sort(() => Math.random() - 0.5);
  }

  checkAnswer(selectedOption: string) {
    if (selectedOption === this.currentSongName) {
      this.score++;
    } else {
      this.score = Math.max(this.score - 1, 0);  // Penalización por respuesta incorrecta
    }

    // Si el puntaje es alcanzado o el juego se debe terminar
    if (this.score >= 10) {
      this.gameOver = true;
    } else {
      this.startNewRound();
    }
  }

  restartGame() {
    this.score = 0;
    this.gameOver = false;
    this.startNewRound();
  }
}
