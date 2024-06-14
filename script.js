const terminal = document.getElementById('terminal');
const output = document.getElementById('output');
const codeTypeSelect = document.getElementById('codeType');
const startButton = document.getElementById('startButton');

let realisticTextOptions = []; // Array to hold realistic text options

startButton.addEventListener('click', async () => {
    terminal.style.display = 'block'; // Show terminal after starting
    const codeType = codeTypeSelect.value;

    // Clear any existing content
    output.innerHTML = '';

    if (codeType === 'random') {
        generateRandomCodes();
    } else if (codeType === 'realistic') {
        // Fetch realistic text from JSON file
        await fetchRealisticText();
    }
});

document.addEventListener('keydown', async (event) => {
    if (terminal.style.display === 'block' && event.key === ' ') {
        event.preventDefault(); // Prevent default space bar behavior (scrolling)

        if (codeTypeSelect.value === 'random') {
            const randomCode = generateRandomCode();
            const codeLine = document.createElement('p');
            codeLine.textContent = randomCode;
            output.appendChild(codeLine);
        } else if (codeTypeSelect.value === 'realistic') {
            await generateRealisticText();
        }
    }
});

async function fetchRealisticText() {
    try {
        const response = await fetch('realistic-text.json');
        const data = await response.json();
        realisticTextOptions = data.phrases;
    } catch (error) {
        console.error('Error fetching realistic text:', error);
    }
}

function generateRandomCodes() {
    const randomCode = generateRandomCode();
    const codeLine = document.createElement('p');
    codeLine.textContent = randomCode;
    output.appendChild(codeLine);
}

function generateRandomCode() {
    const codeLength = Math.floor(Math.random() * 4) + 1; // Random length (1 to 4 lines)
    let code = '';
    for (let i = 0; i < codeLength; i++) {
        const randomChars = Math.random().toString(36).substring(2, 10); // Random alphanumeric string
        code += `$ ${randomChars}\n`;
    }
    return code;
}

async function generateRealisticText() {
    const randomIndex = Math.floor(Math.random() * realisticTextOptions.length);
    const text = realisticTextOptions[randomIndex];

    const textLine = document.createElement('p');
    textLine.textContent = text;
    output.appendChild(textLine);

    // Scroll to bottom of terminal output
    terminal.scrollTop = terminal.scrollHeight;
}
