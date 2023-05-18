import {Card, CardActionArea, CardMedia, CardContent, Typography, Container, Button} from '@material-ui/core';
import {connect, useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useMemo, useState} from 'react';
import {history} from '../helpers';
import {getArticlesAction, searchArticles} from "../store/actions/Articles/getArticlesAction";
import ImgMediaCard from "../components/article";
import Grid from "@material-ui/core/Grid";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";
import {toast} from "react-toastify";
import Select from "react-select";
import countryList from "react-select-country-list";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewsPage = ({getAllArticles, searchArticles}) => {
    const dispatch = useDispatch()
    const [news, setNews] = useState([])
    const articles = useSelector((state) => state.auth.articles);
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    const [selectedCountry, setSelectedCountry] = useState('');
    const options = useMemo(() => countryList().getData(), [])

    const [source, setSource] = useState('')
    const [sources, setSources] = useState([])

    const [author, setAuthor] = useState('')
    const [authors, setAuthors] = useState([])

    const [category, setCategory]=useState('')
    const [startDate, setStartDate] = useState(new Date());


    const handleCountryChange = (country) => {
        setSelectedCountry(country);
        console.log(country.label)
    };
    const handleSourceChange = (source) => {
        setSource(source);
        console.log(source)
    };
    const handleAuthorChange = (author) => {
        setAuthor(source);
        console.log(source)
    };
    useEffect(() => {
        setLoading(true)
        const timer = setTimeout(() => {
            dispatch(getAllArticles)
            setNews(articles)
            console.log(articles)
            setLoading(false)
            return () => clearTimeout(timer);
        }, 2000);

        const sources = news.map(item => item.source.name);
        setSources(sources)
        const authors = news.map(item => item.author);
        setAuthors(authors)
    }, []);

    const onSubmitSearch = (event) => {
        event.preventDefault()
        if (searchTerm === '') {
            toast.error('please write valid text');
        }
        setLoading(true)
        dispatch(searchArticles(searchTerm,selectedCountry,author,source,category,startDate))
        setSearchTerm('')
        setNews(articles)
        console.log(articles)
        setLoading(false)
    }


    return (
        <Container component="main" maxWidth="md">
            <br/><br/>
            <br/><br/>

            <div className='col-md-12'>
                <form onSubmit={(event) => {
                    onSubmitSearch(event);

                }}>
                    <TextField
                        value={searchTerm}
                        onChange={(event) => {
                            setSearchTerm(event.target.value);
                        }}
                        fullWidth={false}
                        label="type keywords"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <SearchIcon/>
                                    </IconButton>

                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        value={category}
                        onChange={(event) => {
                            setCategory(event.target.value);
                        }}
                        fullWidth={false}
                        label="type the category"
                    />
                    <br/>


                <br/>
                <label htmlFor="">started from</label>
                <DatePicker label={'start From'} selected={startDate} onChange={(date) => setStartDate(date)} />
                <br/>
                <br/>
                <Select
                    fullWidth={false}
                    defaultInputValue={'select country'}

                    options={options}
                    value={selectedCountry}
                    onChange={handleCountryChange}
                />
                <br/>
                <Select
                    options={sources}
                    defaultInputValue={'select source'}

                    value={source}
                    onChange={handleSourceChange}
                />
                <br/>
                <Select
                    defaultInputValue={'select author'}
                    options={authors}
                    value={author}
                    onChange={handleAuthorChange}
                />
                </form>
                <br/><br/>
                <Grid
                    container
                    spacing={4}
                    direction="row"
                    justify="center"
                    alignItems="stretch"
                >
                    {loading ? (
                            <Typography gutterTop left variant="h1" component="div">
                                loading....
                            </Typography>
                        ) :
                        (
                            news.map((data, key) => {
                                    return key + 1 <= 10 ?
                                        (
                                            <Grid item md={4}>
                                                <ImgMediaCard
                                                    title={data.title}
                                                    author={data.author}
                                                    imageUrl={data.urlToImage}
                                                    content={data.content}
                                                    url={data.url}
                                                />

                                            </Grid>


                                        ) : undefined;
                                }
                            )


                        )

                    }
                </Grid>

            </div>


        </Container>
    );
}
const mapStateToProps = (state) => ({
    articles: state.auth.articles,
});

const mapDispatchToProps = (dispatch) => ({
    getAllArticles: () => dispatch(getArticlesAction()),
    searchArticles: (text) => dispatch(searchArticles(text))
});
export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);