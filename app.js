const gamesGrid =
    document.getElementById("gamesGrid");

const searchInput =
    document.getElementById("searchInput");

const gameCount =
    document.getElementById("gameCount");

const noResults =
    document.getElementById("noResults");

const gameModal =
    document.getElementById("gameModal");

const gameFrame =
    document.getElementById("gameFrame");

const modalTitle =
    document.getElementById("modalTitle");

const closeButton =
    document.getElementById("closeButton");

const fullscreenButton =
    document.getElementById("fullscreenButton");

const modalBackdrop =
    document.getElementById("modalBackdrop");

const iframeContainer =
    document.getElementById("iframeContainer");


/*
    Games
*/

const games = [

    {
        id: "2048",
        title: "2048",
        description: "Combine numbers and reach 2048.",
        category: "Puzzle",
        icon: "🔢",
        iframe: "2048.html"
    },

    {
        id: "Super Hexagon",
        title: "Super Hexagon",
        description: "A dodging game where you have to fit your arrow through the other hexagons closing in on you.",
        category: "Dodging",
        icon: "⬣",
        iframe: "Super-Hexagon.html"
    },

    {
        id: "Minecraft Clone",
        title: "Minecraft Clone",
        description: "A Minecraft Clone",
        category: "Building",
        icon: "⛏️",
        iframe: "mncrftcln.html"
    },

    {
        id: "Snake Game",
        title: "Snake Game",
        description: "The classic snake game",
        category: "Growing",
        icon: "🐍",
        iframe: "snake.html"
    },    

    {
        id: "Flappy Bird",
        title: "Flappy Bird",
        description: "Clasic flappy bird.",
        category: "Dodging",
        icon: "🐦",
        iframe: "Flappy-Bird.html"
    },
];


/*
    Render game cards.
*/

function renderGames(gameList) {

    gamesGrid.innerHTML = "";

    gameCount.textContent =
        `${gameList.length} ${
            gameList.length === 1
                ? "game"
                : "games"
        }`;


    if (gameList.length === 0) {

        noResults.classList.remove(
            "hidden"
        );

        return;
    }


    noResults.classList.add(
        "hidden"
    );


    gameList.forEach(game => {

        gamesGrid.appendChild(
            createGameCard(game)
        );

    });
}


/*
    Create a game card.
*/

function createGameCard(game) {

    const card =
        document.createElement("article");

    card.className =
        "game-card";


    const thumbnail =
        document.createElement("div");

    thumbnail.className =
        "game-thumbnail";


    const icon =
        document.createElement("span");

    icon.className =
        "game-icon";

    icon.textContent =
        game.icon || "🎮";


    thumbnail.appendChild(icon);


    const info =
        document.createElement("div");

    info.className =
        "game-info";


    const title =
        document.createElement("h3");

    title.textContent =
        game.title;


    const description =
        document.createElement("p");

    description.textContent =
        game.description || "";


    info.appendChild(title);

    info.appendChild(description);


    if (game.category) {

        const category =
            document.createElement("span");

        category.className =
            "tag";

        category.textContent =
            game.category;

        info.appendChild(category);
    }


    card.appendChild(thumbnail);

    card.appendChild(info);


    card.addEventListener(
        "click",
        () => openGame(game)
    );


    return card;
}


/*
    Open game.
*/

function openGame(game) {

    if (!game.iframe) {

        alert(
            "This game does not have a file."
        );

        return;
    }


    modalTitle.textContent =
        game.title;


    gameFrame.src =
        game.iframe;


    gameModal.classList.remove(
        "hidden"
    );


    document.body.style.overflow =
        "hidden";
}


/*
    Close game.
*/

function closeGame() {

    gameModal.classList.add(
        "hidden"
    );


    gameFrame.src = "";


    document.body.style.overflow =
        "";
}


/*
    Search games.
*/

searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .trim()
                .toLowerCase();


        if (!query) {

            renderGames(games);

            return;
        }


        const results =
            games.filter(game => {

                const text = [

                    game.title,

                    game.description,

                    game.category,

                    ...(game.tags || [])

                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();


                return text.includes(query);

            });


        renderGames(results);

    }
);


/*
    Close button.
*/

closeButton.addEventListener(
    "click",
    closeGame
);


/*
    Click outside game.
*/

modalBackdrop.addEventListener(
    "click",
    closeGame
);


/*
    Fullscreen.
*/

fullscreenButton.addEventListener(
    "click",
    async () => {

        try {

            if (
                iframeContainer.requestFullscreen
            ) {

                await iframeContainer.requestFullscreen();

            }

        } catch (error) {

            console.error(
                "Fullscreen failed:",
                error
            );

        }

    }
);


/*
    Escape key.
*/

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            !gameModal.classList.contains(
                "hidden"
            )
        ) {

            closeGame();

        }

    }
);


/*
    Start website.
*/

renderGames(games);
