const express = require('express');
const router = express.Router();

const projectsList = [
  {
    id: 'neuromind-platform',
    title: 'NeuroMind Platform',
    category: 'AI/ML & Fullstack',
    description: 'A clinical neurological diagnostic software suite designed to assist medical practitioners. Incorporates transfer-learning ShallowFBCSPNet architectures, autoencoder neural networks for signal anomaly classification, and custom RAG model agents to provide personalized diagnostic insights and therapeutic recommendations.',
    tags: ['React', 'Node.js', 'Python', 'Machine Learning', 'Signal Processing', 'RAG'],
    github: 'https://github.com/talhaiftikhar001',
    demo: '#'
  },
  {
    id: 'heart-disease-predictor',
    title: 'Heart Disease Risk Predictor',
    category: 'AI/ML',
    description: 'Machine learning model predicting cardiovascular hazards using patient biometric parameters. Features automated CI/CD deployment pipelines alongside custom GitHub actions validating model weights, testing accuracy metrics, and checking compliance frameworks on every commit.',
    tags: ['Python', 'Machine Learning', 'CI/CD', 'GitHub Actions', 'Scikit-Learn'],
    github: 'https://github.com/talhaiftikhar001',
    demo: '#'
  },
  {
    id: 'self-driving-vision-assistant',
    title: 'Embedded Self-Driving Vision Assistant',
    category: 'Robotics & Vision',
    description: 'Low-latency computer vision framework deployed on a Raspberry Pi embedded module. Performs real-time lane tracking, traffic sign segmentation, obstacle avoidance, and sensory feedback loops utilizing OpenCV filters and path-planning algorithms.',
    tags: ['OpenCV', 'Python', 'Raspberry Pi', 'Embedded Systems', 'Computer Vision'],
    github: 'https://github.com/talhaiftikhar001',
    demo: '#'
  },
  {
    id: 'emotion-recognition-layer',
    title: 'Real-Time Emotion Recognition Layer',
    category: 'AI/ML',
    description: 'An AI-powered neural analysis framework tracking facial expressions from live camera streams. Deploys highly optimized convolutional layers to minimize inference latency and enable high-fidelity integration into interactive applications.',
    tags: ['Python', 'OpenCV', 'TensorFlow', 'Deep Learning', 'Low Latency'],
    github: 'https://github.com/talhaiftikhar001',
    demo: '#'
  },
  {
    id: 'audio-signal-classification',
    title: 'Audio Signal Classification Application',
    category: 'Signal Processing',
    description: 'A Web audio interface analyzing raw voice and acoustic waves. Extracts mel-spectrogram arrays, audio features (MFCCs, spectral centroid), and runs signal recognition pipelines using custom neural nets with a Flask backend server interface.',
    tags: ['Python', 'Flask', 'Machine Learning', 'Audio Processing', 'Librosa'],
    github: 'https://github.com/talhaiftikhar001',
    demo: '#'
  },
  {
    id: 'iot-rfid-gateway',
    title: 'Distributed IoT RFID Scanning Gateway',
    category: 'IoT & Web',
    description: 'A multi-scanner management system for warehouse and asset telemetric tracking. Collects data from distributed ESP32 RFID modules, coordinates communication queues via custom protocols, and displays live metrics on a Node.js dashboard.',
    tags: ['Node.js', 'IoT', 'Express', 'Web Dashboard', 'RFID', 'ESP32'],
    github: 'https://github.com/talhaiftikhar001',
    demo: '#'
  },
  {
    id: 'universal-metals-ecommerce',
    title: 'Universal Metals E-Commerce System',
    category: 'Web Dev',
    description: 'B2B e-commerce enterprise solution targeting metal fabrication and supply operations. Integrates advanced pricing matrices, custom weight calculators, search filtering, and robust schema management driven by a MySQL database engine.',
    tags: ['Flask', 'MySQL', 'Python', 'E-Commerce', 'Database Design'],
    github: 'https://github.com/talhaiftikhar001',
    demo: '#'
  },
  {
    id: 'retail-yolov8-scanner',
    title: 'Retail YOLOv8 Automated Object Scanner',
    category: 'Robotics & Vision',
    description: 'Smart self-checkout visual tracking engine executing high-speed YOLOv8 object detection pipelines. Automatically identifies retail items in camera frames, registers items with price lookup servers, and handles item overlap scenarios.',
    tags: ['YOLOv8', 'OpenCV', 'PyTorch', 'Computer Vision', 'Retail Tech'],
    github: 'https://github.com/talhaiftikhar001',
    demo: '#'
  },
  {
    id: 'fpga-processor-design',
    title: 'FPGA Hardware Architecture Processor Design',
    category: 'Hardware',
    description: 'A custom structural processor architecture modeled in Verilog. Includes register file architectures, arithmetic logic units (ALU), memory decoders, control pathways, and successful validation outputs through physical FPGA synthesis pipelines.',
    tags: ['Verilog', 'FPGA', 'Computer Architecture', 'Synthesis', 'Hardware Design'],
    github: 'https://github.com/talhaiftikhar001',
    demo: '#'
  }
];

router.get('/', (req, res) => {
  res.json(projectsList);
});

module.exports = router;
