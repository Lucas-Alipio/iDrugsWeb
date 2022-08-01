import styles from './Search.module.css';

function Search() {
    return (
        <div className={styles.search}>
            <form>
                <div>
                    <input type="text"/>
                </div>
                <div>
                    <button>Procurar</button>
                </div>
            </form>
        </div>
    )
}

export default Search;