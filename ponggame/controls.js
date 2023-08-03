const UPARROW = 38;
const DOWNARROW = 40;
const WKEY = 87;
const SKEY = 83;
let paddleVelocity = 5;
let paddleVelocityR = 2.5;
let paddleVelocityL = 2.5;

window.addEventListener("keydown", keyDown);
function keyDown(event) {
    const key = event.keyCode;
    console.log(`KEYDOWN: ${key}`);
    
    if (scoreL > scoreR) {
        switch (key) {
            case (WKEY):
                paddleL.vy = -paddleVelocityL;
                break;
            case (SKEY):
                paddleL.vy = paddleVelocityL;
                break;
            case (UPARROW):
                paddleR.vy = -paddleVelocity;
                break;
            case (DOWNARROW):
                paddleR.vy = paddleVelocity;
                break;
            default:
                // nothing matched, do this
        }
    } 
    else if (scoreR > scoreL) {
        switch (key) {
            case (WKEY):
                paddleL.vy = -paddleVelocity;
                break;
            case (SKEY):
                paddleL.vy = paddleVelocity;
                break;
            case (UPARROW):
                paddleR.vy = -paddleVelocityR;
                break;
            case (DOWNARROW):
                paddleR.vy = paddleVelocityR;
                break;
            default:
                // nothing matched, do this
        }
    } else {
    switch (key) {
        case (UPARROW):
            paddleR.vy = -paddleVelocity;
            break;
        case (DOWNARROW):
            paddleR.vy = paddleVelocity;
            break;
        case (WKEY):
            paddleL.vy = -paddleVelocity;
            break;
        case (SKEY):
            paddleL.vy = paddleVelocity;
            break;
        default:
            // nothing matched, do this
    }
}
}


window.addEventListener("keyup", keyUp);
function keyUp(event) {
    const key = event.keyCode;
    console.log(`KEYUP:   ${key}`);
    
    switch (key) {
        case (UPARROW):
        case (DOWNARROW):
            paddleR.vy = 0;
            break;
        case (WKEY):
        case (SKEY):
            paddleL.vy = 0;
            break;
        default:
            // nothing matched, do this
    }
}