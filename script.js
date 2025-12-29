const { createFFmpeg, fetchFile } = FFmpeg;
const c = createFFmpeg({ log: false });
const x = async () => {
    const f = document.getElementById('f').files[0];
    const m = document.getElementById('m').value;
    const e = document.getElementById('e').value;
    const b = document.getElementById('b');
    const s = document.getElementById('s');
    const d = document.getElementById('d');
    const g = document.getElementById('g');
    if (!f) return;
    b.disabled = true;
    g.style.display = 'none';
    s.innerText = 'loading core...';
    if (!c.isLoaded()) await c.load();
    s.innerText = 'converting...';
    c.FS('writeFile', 'i', await fetchFile(f));
    if (m === 'v2a') {
        await c.run('-i', 'i', `o.${e}`);
    } else {
        await c.run('-f', 'lavfi', '-i', 'color=c=black:s=1280x720:r=1', '-i', 'i', '-shortest', `o.${e}`);
    }
    const o = c.FS('readFile', `o.${e}`);
    const u = URL.createObjectURL(new Blob([o.buffer], { type: m === 'v2a' ? `audio/${e}` : `video/${e}` }));
    d.href = u;
    d.download = `output.${e}`;
    g.style.display = 'grid';
    s.innerText = 'done';
    b.disabled = false;
};