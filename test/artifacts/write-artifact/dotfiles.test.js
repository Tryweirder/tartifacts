'use strict';

const fs = require('fs');

const test = require('ava');
const mockFs = require('mock-fs');

const writeArtifacts = require('../../../lib');

test.afterEach(() => mockFs.restore());

test('should include dot files by default', async t => {
    mockFs({
        'source-dir': {
            '.dot-file': 'bla',
            'file-1.txt': 'Hi!'
        }
    });

    await writeArtifacts({ name: 'artifact-dir', patterns: 'source-dir/**' });

    const files = fs.readdirSync('./artifact-dir/source-dir');

    t.deepEqual(files, ['.dot-file', 'file-1.txt']);
});

test('should ignore dot files', async t => {
    mockFs({
        'source-dir': {
            '.dot-file': 'bla',
            'file-1.txt': 'Hi!'
        }
    });

    await writeArtifacts({ name: 'artifact-dir', patterns: 'source-dir/**' }, { dotFiles: false });

    const files = fs.readdirSync('artifact-dir/source-dir');

    t.deepEqual(files, ['file-1.txt']);
});
