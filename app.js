let model;

// モデルをロードする関数
async function loadModel() {
    model = await tf.loadLayersModel('URL_TO_MODEL/model.json');
    console.log('Model loaded.');
}

// 元素辞書
const elements = {
    "H": 1, "He": 2, "Li": 3, "Be": 4, "B": 5, "C": 6, "N": 7, "O": 8, "F": 9, "Ne": 10,
    "Na": 11, "Mg": 12, "Al": 13, "Si": 14, "P": 15, "S": 16, "Cl": 17, "Ar": 18, "K": 19, "Ca": 20,
    "Fe": 26, "Cu": 29, "Zn": 30, "I": 53
};

// データを数値に変換する関数
function convertElement(data) {
    return data.map(element => elements[element] || console.log(`Unknown element: ${element}`));
}

// モデルで予測を行う関数
async function predict(hand) {
    const numericHand = convertElement(hand);
    const inputTensor = tf.tensor2d([numericHand]);
    const prediction = await model.predict(inputTensor);
    const predictionValue = prediction.dataSync()[0];

    return predictionValue <= 0.5 ? 'generate' : 'exchange';
}

// テスト予測を実行する関数
async function testPredict() {
    const result = await predict(["H", "H", "H", "H", "H", "H", "C", "C"]);
    document.getElementById('predictionResult').innerText = `Prediction: ${result}`;
}
