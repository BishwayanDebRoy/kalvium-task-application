require('./envloader')();

const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const baseRouter = require('./router.js');
const PORT = process.env.PORT || 3000;
const { respond, l } = require('./loader.js').helpers;

// Load dependencies
require('./loader.js').loadDependency(app);

/* Middlewares */
app.use(express.json());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return respond(res, 400, { message: 'Invalid JSON found' });
    }
    next();
});

// Log all API requests
app.use(
    morgan(
        'REQUEST [:date[clf]] ":method :url HTTP/:http-version" :status :user-agent',
        {
            immediate: true,
            skip: function (req) { return (req.path === '/api/'); },
        }
    )
);

app.use(
    express.urlencoded({
        extended: true,
        limit: '2mb',
        parameterLimit: 1000000,
    })
);

app.use(compression());
app.use(helmet());
app.use(cors());

app.use('/api/', baseRouter);

// Route to check server status
app.get('/', (req, res) => {
    return res.send('Compiler is up and working');
});

// Compilation endpoint
app.post('/api/compile', async (req, res) => {
    const { code, language } = req.body;

    try {
        // Placeholder for your compilation logic
        // Replace this with actual code execution or compilation
        let output;
        if (language === 'javascript') {
            // Example: Execute JavaScript code using a safe sandbox environment
            // This is just a placeholder and should be replaced with actual logic
            output = eval(code); // NEVER use eval like this in production
        } else if (language === 'python') {
            // Example: Execute Python code using a Python interpreter
            // You might need to call a script or use a service
            output = 'Python code executed: ' + code;
        } else if (language === 'cpp') {
            // Example: Compile and run C++ code using a compiler
            // You would typically call a compiler or a service
            output = 'C++ code compiled and executed: ' + code;
        } else {
            output = 'Unsupported language';
        }

        res.json({ output });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    l.info(`Server started at port: ${PORT}`);
});
