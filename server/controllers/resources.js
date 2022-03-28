const fs = require('fs')
const fsp = fs.promises

module.exports.landingMP4 = (req, res) => {

    let path = undefined
    req.query.isMobile === 'true' ?
        path = `${ __dirname }/..${process.env.RESOURCE_DIR}/pokebattlemonLandingMobile.mp4` :
        path = `${__dirname}/..${process.env.RESOURCE_DIR}/pokebattlemonLanding.mp4`

    fsp.stat(path)
        .then(stat => {
            const fileSize = stat.size
            const range = req.headers.range

            if (range) {
                const parts = range.replace(/bytes=/, '').split('-')
                const start = parseInt(parts[0], 10)
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
                const chunksize = (end - start) + 1
                const file = fs.createReadStream(path, { start, end })
                const head = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize,
                    'Content-Type': 'video/mp4',
                }
                res.writeHead(206, head)
                file.pipe(res)
            } else {
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': 'video/mp4'
                }
                res.writeHead(200, head)
                fs.createReadStream(path).pipe(res)
            }

        })
}