import { Component } from 'react'
import type { State } from './types'

export class Password extends Component {
    state: State = {
        length: 10,
        includeUpper: true,
        includeLower: true,
        includeNumbers: true,
        includeSymbols: true,
        mode: 'all',
        password: ''
    };

    componentDidMount() {
        this.generatePassword();
    }

    randomChar = (chars: string) =>  chars[Math.floor(Math.random() * chars.length)];

    generatePassword = () => {
        const { length, includeUpper, includeLower, includeNumbers, includeSymbols, mode } = this.state;
        const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';
        let pool = '';

        if (mode === 'easy-say') {
            pool = 'abcdefhijklmnopqrstuvwxyz0123456789';
        } else if (mode === 'easy-read') {
            pool = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz0123456789';
        } else {
            if (includeUpper) pool += upperChars;
            if (includeLower) pool += lowerChars;
            if (includeNumbers) pool += numberChars;
            if (includeSymbols) pool += symbolChars;
        }

        if (!pool) {
            this.setState({ password: '' });
            return;
        }

        let pwd = '';
        for (let i = 0; i < length; i++) {
            pwd += this.randomChar(pool);
        }
        this.setState({ password: pwd });
    };

    copyToClipboard = () => {
        navigator.clipboard.writeText(this.state.password);
    };


    render() {
        const { length, includeUpper, includeLower, includeNumbers, includeSymbols, mode, password } = this.state;
        return (<div>

            <div className="flex items-center justify-between bg-gray-50 px-4 py-3 mb-6 rounded-xl shadow-lg my-8">
                <span className="text-xl font-mono">{password}</span>
                <div className="flex space-x-2">
                    <button onClick={this.copyToClipboard} className="p-2 cursor-pointer active:scale-95">
                        <img width="35px" src="src/assets/copy.png" alt="copy" />
                    </button>
                    <button onClick={this.generatePassword} className="p-2 cursor-pointer active:scale-95">
                        <img width="30px" src="src/assets/generate.jpg" alt="generate" />
                    </button>
                </div>
            </div>
            <div className="bg-gray-100 flex items-center justify-center p-4">
                <div className="w-full bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Customize your password</h2>
                    <div className="flex justify-between">
                        <div>
                            <label className="block text-gray-700 mb-1">Password Length</label>
                            <div className="flex items-center space-x-4">
                                <input type="number" min={1} max={50} value={length} onChange={e => +e.target.value < 51 ? this.setState({ length: +e.target.value }) : this.setState({ length: 50 }, this.generatePassword)} className="w-16 px-2 py-1 border rounded" />
                                <input type="range" min={1} max={50} value={length} onChange={e => this.setState({ length: +e.target.value }, this.generatePassword)} className="w-70 bg-red-400 cursor-pointer" />
                            </div>
                        </div>

                        <fieldset>
                            <label className="flex items-center space-x-2">
                                <input className='cursor-pointer' type="radio" name="mode" checked={mode === 'easy-say'} onChange={() => this.setState({ mode: 'easy-say', includeLower: true, includeUpper: false, includeNumbers: true, includeSymbols: false }, this.generatePassword)} />
                                <span>Easy to say</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input className='cursor-pointer' type="radio" name="mode" checked={mode === 'easy-read'} onChange={() => this.setState({ mode: 'easy-read', includeLower: false, includeUpper: true, includeNumbers: true, includeSymbols: false }, this.generatePassword)} />
                                <span>Easy to read</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input className='cursor-pointer' type="radio" name="mode" checked={mode === 'all'} onChange={() => this.setState({ mode: 'all', includeLower: true, includeUpper: true, includeNumbers: true, includeSymbols: true }, this.generatePassword)} />
                                <span>All characters</span>
                            </label>
                        </fieldset>

                        <div>
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" checked={includeUpper} onChange={e => this.setState({ includeUpper: e.target.checked }, this.generatePassword)} />
                                <span>Uppercase</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" checked={includeLower} onChange={e => this.setState({ includeLower: e.target.checked }, this.generatePassword)} />
                                <span>Lowercase</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" checked={includeNumbers} onChange={e => this.setState({ includeNumbers: e.target.checked }, this.generatePassword)} />
                                <span>Numbers</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" checked={includeSymbols} onChange={e => this.setState({ includeSymbols: e.target.checked }, this.generatePassword)} />
                                <span>Symbols</span>
                            </label>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button onClick={this.copyToClipboard} className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition">
                            Copy password
                        </button>
                    </div>
                </div>
            </div>
        </div>
        );
    }


}
