document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("radio");
  const playBtn = document.getElementById("playBtn");
  const statusEl = document.getElementById("status");

  // URL del tuo stream
  const STREAM_URL = "https://cast2.asurahosting.com/proxy/disisrad?mp=/stream";

  audio.src = STREAM_URL;

  function updateStatus(text) {
    statusEl.textContent = text;
  }

  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          updateStatus("Trasmissione in corso…");
          playBtn.textContent = "⏸️ Pausa";
        })
        .catch((err) => {
          updateStatus("Errore: " + err.message);
          console.error(err);
        });
    } else {
      audio.pause();
      updateStatus("Pausato");
      playBtn.textContent = "▶️ Ascolta DisisRadio";
    }
  });

  // avvisa quando lo stream è pronto
  audio.addEventListener("canplay", () => {
    updateStatus("Pronto a trasmettere");
  });

  // avvisa se si interrompe o impalla
  audio.addEventListener("error", () => {
    updateStatus("Errore nello stream, riprova");
  });
});
