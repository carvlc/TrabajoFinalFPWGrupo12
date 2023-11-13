import './footer.css';

function Footer() {
    return(
        <>
        <div className="footer">
            <div className="footer-row">
                <div className="footer-links">
                    <h4>Integrantes</h4>        
                    <ul>
                        <li><a href="https://github.com/cesarbanzan">Banzan Cèsar Emilio</a></li>
                        <li><a href="https://github.com/Joaset">Torres Flores Joaquin Victor</a></li>
                        <li><a href="https://github.com/carvlc">Vilca Carlos Norberto Salvador</a></li>
                    </ul>
                </div>
                <div className="footer-links">
                    <h4>Redes Sociales</h4>        
                    <div className="social-link">
                        <a href="https://www.facebook.com"><i className="bi bi-facebook"></i></a>
                        <a href="https://www.instagram.com"><i className="bi bi-instagram"></i></a>
                        <a href="https://twitter.com"><i className="bi bi-twitter"></i></a>
                        <a href="https://www.youtube.com"><i className="bi bi-youtube"></i></a>
                        <a href="https://www.linkedin.com"><i className="bi bi-linkedin"></i></a>
                    </div>
                </div>
            </div>
            <p className="copy">&copy; Grupo 12 FPW 2023</p>
        </div>
        </>
    );
}

export default Footer;