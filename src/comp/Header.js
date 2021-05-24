import React from 'react'
import LogoBlack from '../files/blackLogo.png'
import { AiOutlinePlus } from "react-icons/ai"
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import '../styles/header.css'
import { FirstLetterMaji } from '../outils'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));


const Header = ({user, photoUrl}) => {

    const classes = useStyles();


    return (
        <div className="header">
          <div className="header__content">
            <div className="header__logo">
                  <img src={LogoBlack} alt="" />
              </div>
              <div className="header__rest">
                  <div>
                      <AiOutlinePlus />
                  </div>
                  <div>
                    <div>
                      <h3>{FirstLetterMaji(user?.username)}</h3>
                      <Avatar src={photoUrl} alt="profil" className={classes.small} />
                    </div>
                  </div>
              </div>
          </div>
        </div>
    )
}

export default Header
