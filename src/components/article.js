import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from "@material-ui/core/Link";
import {CardHeader} from "@material-ui/core";

export default function ImgMediaCard({title, content, imageUrl, author, publishedAt, url}) {
    return (
        <Card  sx={{ maxWidth: 300 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                maxheight="100"
                image={imageUrl}
            />
            <CardHeader>
                <Typography gutterBottom  variant="h5" component="div">
                    {author}
                </Typography>
                <Typography gutterBottom right variant="h5" component="div">
                    {publishedAt}
                </Typography>
            </CardHeader>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Link href={url} underline="always">
                    Read more
                </Link>
            </CardActions>
        </Card>
    );
}