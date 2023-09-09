<template>
  <div class="masthead">
    <div class="container">
      <div class="masthead-subheading">
        Bienvenue sur mon site de streaming!
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div v-if="movies" class="row">
      <div v-for="movie in movies" :key="movie.imdbid" class="col-2">
        <div class="card">
          <img
            :src="movie.imageurl[0]"
            height="250"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h8 class="card-title text-info font-weight-bold pr-5 ma-0">
              {{
                movie.title && movie.title.length < 20
                  ? movie.title
                  : movie.title.substring(0, 20) + ".."
              }}</h8
            >
            <p class="card-text">
              Genre: {{ movie.genre[0] }}, {{ movie.genre[1] }}
            </p>
            <p class="card-text">Note: {{ movie.imdbrating }}</p>
            <p class="card-text">Date: {{ movie.released }}</p>

            <button
              type="button"
              class="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#movieDetail"
              @click="showMovieDetails(movie)"
            >
              Details
              <!-- <i class="fa fa-line-chart"></i> -->
            </button>
          </div>
        </div>
        <br />
        <div
    class="modal fade"
    id="movieDetail"
    tabindex="-1"
    aria-labelledby="movieDetailLabel"
    aria-modal="true"
    role="dialog"
  >
    <div class="modal-dialog modal-center">
      <div class="modal-content">
        <div class="modal-header">
          <i class="fa fa-line-chart"></i> &nbsp; &nbsp;
          <h5 class="modal-title h4" id="movieDetailLabel">
            Detail
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
                  <p class="card-text">Note: {{ selectedMovie && selectedMovie.imdbrating }}</p>
                  <p class="card-text">Synopsis: {{ selectedMovie && selectedMovie.synopsis }}</p>
                  <p class="card-text">Type: {{ selectedMovie && selectedMovie.type }}</p>
              <!-- <ProjectDetail /> -->
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            @click="generateReport()"
          >
           Voir
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
      </div>
 
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>

  <!-- Full screen modal Details -->
 
</template>

<script>
import { fetchData } from "../ApiService/ApiService"; //ici nous  appelons la fonction qui  recupere les datas  de L'API

export default {
  data() {
    return {
      movies: [],
      loading: false, // Ajout de la variable de chargement
      selectedMovie: null,
    };
  },
  mounted() {
    this.fetchData(); //Ici  nous  faisons appel  a la fonction fetchData lors  de l'initialisation du  composant
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true; // Activer le chargement

        this.movies = await fetchData(); //movies  est  mis  a  jour lorsque les datas  sont renvoyer par  la promesse
        this.loading = false; // Désactiver le chargement
      } catch (error) {
        //pour la  capture des erreur lors de l'appel API
        console.error(error);
        this.loading = false; // Désactiver le chargement en cas d'erreur
      }
    },
    showMovieDetails(movie) {
      this.selectedMovie = movie;
    },
  },
};
</script>
<style>
.masthead {
  padding-top: 10.5rem;
  padding-bottom: 10.5rem;
  margin-bottom: 2rem;
  text-align: center;
  /* color: #2976ce; */
  background-image: url("../assets/deo.jpg");
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: center center;
  background-size: cover;
}

.masthead .masthead-subheading {
  font-size: 1.5rem;
  font-style: italic;
  line-height: 1.5rem;
  margin-bottom: 25px;
  color: rgb(39, 39, 242);
  font-weight: bold;
  font-family: "Roboto Slab", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
</style>
