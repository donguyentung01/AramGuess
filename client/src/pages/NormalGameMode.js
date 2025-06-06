import GuessTracker from "../components/GuessTracker";
import GuessTimer from "../components/GuessTimer";
import Game from "../components/Game";
import ResultModal from "../components/ResultModal";

const NormalGameMode = ({
  authState: { isAuthenticated, setIsLoginOpen },
  gameState: {
    isResultOpen,
    isCorrect,
    prediction,
    blueWins,
    guessesLeft,
    timeLeft,
    setTimeLeft,
    isRecord,
    totalScore,
    gameStart,
    setGameStart
  },
  gameData: {
    hiddenGame,
    hiddenPlayers,
    runeIconDict,
    gamePlayers,
  },
  gameActions: {
    submitPrediction,
    handleNextQuestion,
    resetGame,
    submitPredictionTimeout,
  },
}) => (
  <div className="game-content">
    <h2 className="nes-score-box">
      <i className="snes-jp-logo nes-text is-warning"></i>Total score:{" "}
      <span id="score">{totalScore}</span>
      <i className="nes-icon star"></i>
    </h2>

    {isRecord && <div>You've made a new record.</div>}

    <GuessTracker guessesLeft={guessesLeft} />

    {!gameStart && <button type="button" className="play-button nes-btn is-warning" onClick={() => setGameStart(true)}>PLAY</button> }

    {guessesLeft > 0 && gameStart && (
      <>
        <GuessTimer
          submitPredictionTimeout={submitPredictionTimeout}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          isResultOpen={isResultOpen}
        />
        <Game
          hiddenGame={hiddenGame}
          hiddenPlayers={hiddenPlayers}
          submitPrediction={submitPrediction}
          runeIconDict={runeIconDict}
        />
      </>
    )}

    {guessesLeft >= 0 && isResultOpen  && gameStart && (
      <ResultModal
        onNextQuestion={handleNextQuestion}
        gamePlayers={gamePlayers}
        isCorrect={isCorrect}
        runeIconDict={runeIconDict}
        hiddenGame={hiddenGame}
        prediction={prediction}
        blueWins={blueWins}
      />
    )}

    {guessesLeft === 0 && !isAuthenticated  && gameStart && (
      <div>
        <button
          type="button"
          className="nes-btn is-warning"
          onClick={() => setIsLoginOpen(true)}
        >
          Log in
        </button>{" "}
        to join the leaderboard
        <span className="leaderboard-emoji">😊</span>
      </div>
    )}

    {guessesLeft === 0 && gameStart && (
      <button
        type="button"
        className="nes-btn is-primary"
        onClick={resetGame}
      >
        Try again
      </button>
    )}
  </div>
);

export default NormalGameMode;
