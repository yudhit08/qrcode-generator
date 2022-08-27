import React, { useState } from "react";
import swal from "sweetalert";

function Card() {
    const [qrCode, setQrCode] = useState({
        text: "",
        mainColor: "#000000",
        bgColor: "#c7c7c7",
        size: 150,
        margin: 1,
        imgFormat: "png",
    });
    const [qrCodeImage, setQrCodeImage] = useState("");
    const [download, setDownload] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setQrCode((prevQrCode) => ({
            ...prevQrCode,
            [name]: value,
        }));
    }

    const downloadQrCode = () => {
        fetch(qrCodeImage, {
            method: "GET",
            headers: {},
        })
            .then((response) => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute(
                        "download",
                        `qrcode_${qrCode.text}.${qrCode.imgFormat}`
                    ); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function handleClick(event) {
        event.preventDefault();
        if(qrCode.text) {
            setQrCodeImage(
                `https://api.qrserver.com/v1/create-qr-code/?size=${qrCode.size}x${
                    qrCode.size
                }&margin=${qrCode.margin}&color=${qrCode.mainColor.slice(
                    1,
                    7
                )}&bgcolor=${qrCode.bgColor.slice(1, 7)}&data=${qrCode.text}`
            );
            setDownload(true);
        } else {
            swal('Perhatian', 'Ketik teks yang ingin Anda buat Kode QR-nya', 'warning')
        }
    }

    return (
        <div className='card-container'>
            <div className='title'>
                <h2>Generate your QR Code</h2>
                <p>
                    Sesuaikan pengaturan di bawah ini untuk membuat Kode QR seperti yang anda inginkan
                </p>
            </div>
            <form action=''>
                <div className='text-input'>
                    <h4>Text/URL</h4>
                    <p>Masukkan text/URL yang ingin anda jadikan Kode QR</p>
                    <input
                        type='text'
                        name='text'
                        value={qrCode.text}
                        onChange={handleChange}
                        autoComplete='off'
                        className='text'
                    />
                </div>
                <div className='color-picker'>
                    <div className='main'>
                        <label htmlFor='mainColor'>Warna Utama</label>
                        <input
                            type='color'
                            name='mainColor'
                            value={qrCode.mainColor}
                            onChange={handleChange}
                        />
                        <p>{qrCode.mainColor.toUpperCase()}</p>
                    </div>
                    <div className='bg-color'>
                        <label htmlFor='bgColor'>Warna Latar</label>
                        <input
                            type='color'
                            name='bgColor'
                            value={qrCode.bgColor}
                            onChange={handleChange}
                        />
                        <p>{qrCode.bgColor.toUpperCase()}</p>
                    </div>
                </div>
                <div className='img-setting'>
                    <div className='size'>
                        <h4>Size</h4>
                        <p>
                            {qrCode.size}x{qrCode.size}
                        </p>
                        <input
                            type='range'
                            name='size'
                            min={10}
                            max={1000}
                            value={qrCode.size}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='margin'>
                        <h4>Margin</h4>
                        <p>{qrCode.margin} px</p>
                        <input
                            type='range'
                            name='margin'
                            min={1}
                            max={50}
                            value={qrCode.margin}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='imgFormat'>
                        <div className='format-box'>
                            <input
                                type='radio'
                                name='imgFormat'
                                value='gif'
                                onChange={handleChange}
                                id='gif'
                            />
                            <label htmlFor='gif'>GIF</label>
                        </div>
                        <div className='format-box'>
                            <input
                                type='radio'
                                name='imgFormat'
                                value='png'
                                onChange={handleChange}
                                id='png'
                            />
                            <label htmlFor='png'>PNG</label>
                        </div>
                        <div className='format-box'>
                            <input
                                type='radio'
                                name='imgFormat'
                                value='jpeg'
                                onChange={handleChange}
                                id='jpeg'
                            />
                            <label htmlFor='jpeg'>JPEG</label>
                        </div>
                        <div className='format-box'>
                            <input
                                type='radio'
                                name='imgFormat'
                                value='jpg'
                                onChange={handleChange}
                                id='jpg'
                            />
                            <label htmlFor='jpg'>JPG</label>
                        </div>
                        <div className='format-box'>
                            <input
                                type='radio'
                                name='imgFormat'
                                value='svg'
                                onChange={handleChange}
                                id='svg'
                            />
                            <label htmlFor='svg'>SVG</label>
                        </div>
                    </div>
                </div>
                <button onClick={handleClick} type='submit'>
                    Generate QR Code
                </button>
                <div className='qrcode'>
                    <img src={qrCodeImage} alt='' />
                </div>
                {download && (
                    <div className='download-btn' onClick={downloadQrCode}>
                        Download QR Code
                    </div>
                )}
            </form>
        </div>
    );
}

export default Card;
