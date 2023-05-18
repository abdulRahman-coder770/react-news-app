import {Card, CardContent, Typography, Container, Button} from '@material-ui/core';
import {connect, useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useMemo, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import { TextField} from "@mui/material";
import {toast} from "react-toastify";
import Select from "react-select";
import countryList from "react-select-country-list";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {getPreferenceById, savePreferences} from "../store/actions/Preferences";

const MyPreferences = ({getPreferenceById, savePreferences}) => {
    const dispatch = useDispatch()
    const [news, setNews] = useState([])
    const articles = useSelector((state) => state.auth.articles);
    const preferences = useSelector((state) => state.auth.preferences);
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

    const [prefs, setPrefs]= useState([])


    const handleCountryChange = (country) => {
        setSelectedCountry(country);
        console.log(country.label)
    };
    const handleSourceChange = (source) => {
        setSource(source);
        console.log(source)
    };
    const handleAuthorChange = (author) => {
        setAuthor(author);
        console.log(source)
    };
    useEffect(() => {
        setLoading(true)
        const timer = setTimeout(() => {
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
    const handlePreferenceClick=(event)=>{
        const id = event.target.id;
        dispatch(getPreferenceById(id))
    }
    const onSubmitPref = (event) => {
        event.preventDefault()
        if (searchTerm === '') {
            toast.error('please write valid text');
        }
        setLoading(true)
        dispatch(savePreferences(selectedCountry,author,source,category,startDate))
        event.target.reset();
        setPrefs(preferences)
        console.log(preferences)
        setLoading(false)
    }

    return (
        <Container component="main" maxWidth="md">
            <br/><br/>
            <br/><br/>
            <div className='col-md-12'>
                <form onSubmit={(event) => {
                    onSubmitPref(event);
                }}>
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
                    <Button loading variant="outlined">
                        save
                    </Button>
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
                            prefs.map((data, key) => {
                                    return key + 1 <= 10 ?
                                        (
                                            <Grid item md={4}>
                                                <Card onClick={handlePreferenceClick} key={data.id}>
                                                    <CardContent>
                                                        <Typography gutterTop left variant="h5" component="div">
                                                            {data.category.name}
                                                        </Typography>
                                                        <Typography gutterTop left variant="h5" component="div">
                                                            {data.author.name}
                                                        </Typography>
                                                        <Typography gutterTop left variant="h5" component="div">
                                                            {data.country.name}
                                                        </Typography>
                                                        <Typography gutterTop left variant="h5" component="div">
                                                            {data.source.name}
                                                        </Typography>
                                                        <Typography gutterTop left variant="h5" component="div">
                                                            {data.date.start_date}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>

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
    getPreferenceById: () => dispatch(getPreferenceById()),
    savePreference: () => dispatch(savePreferences),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyPreferences);