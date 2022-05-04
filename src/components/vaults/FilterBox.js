import React, { useState} from 'react';
import styled from 'styled-components';
import colors from '../../constants/colors';
import SearchIcon from '@material-ui/icons/Search';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import protocols from '../../constants/protocols';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles} from '@material-ui/styles';


const useStyles = makeStyles(() => ({
	list: {
		padding: 0,
        backgroundColor: colors.pallet.darkGrey,
        color: "#ffffff",
        "& :hover": {
            backgroundColor: colors.pallet.lightGrey,  
        },
	},
    protocolList: {
		padding: 0,
        backgroundColor:colors.pallet.darkGrey,
        color: "#ffffff",
        "& :hover": {
            backgroundColor: colors.pallet.lightGrey,  
        },
        width: "220px"
	},
    checkbox: {

    }
}));

const useOutlinedInputStyles = makeStyles(()=> ({
    root: {
      "& $notchedOutline": {
        borderColor: "rgba(255,255,255,0.4)"
      },
      "&:hover $notchedOutline": {
        borderColor: "rgba(255,255,255,1)"
      },
      "&$focused $notchedOutline": {
        borderColor: "rgba(255,255,255,1)"
      }
    },
    focused: {},
    notchedOutline: {}
  }));


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Ubuntu Mono;
    font-weight: 700;
    letter-spacing: 0.05em;
    width: 50%;

    .filter-box {
        background-color: ${colors.pallet.darkGrey};
        width: 95%;
        height: 160px;
        border-radius: 15px;
        border: 2px solid ${colors.vaultCardWhite};
        margin-bottom: 20px;
        position: relative;
    }  

    .wrap{
        width: 90%;
        position: relative;
        top: 10%;
        display: flex;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 10px;
    }

    .search {  
        width: 100%;
        display: flex;
        margin-right: 20px;
    }
    
    .search-input {
        width: 100%;
        border: 1px solid ${colors.pallet.one};
        padding: 10px;
        height: 20px;
        border-radius: 5px;
        outline: none;
        color: ${colors.pallet.lightGrey};
        background-color: ${colors.pallet.two};
        color: white;
        font-size: 1.1em;
        padding: 10px;
        font-family: inherit;
    }
    
    .search-input:focus{
        color: white;
    }
    
    .searchButton {
        width: 40px;
        height: 36px;
        background: ${colors.pallet.one};
        text-align: center;
        color: ${colors.pallet.darkGrey};
        border-radius: 5px 0px 0px 5px;
        font-size: 20px;
    }

    .your-vault {
        display: inline-block
        width: fit-content; 
        white-space: nowrap;
        color: ${colors.vaultCardWhite};
        
        .MuiTypography-body1 {
            font-family: inherit;
            font-size: 1em;
        }
    }

    .bottom-row {
        width: 90%;
        height: 40%;
        top: 20%;
        position: relative;
        margin-left: auto;
        margin-right: auto;
    }

    .dropdown-buttons {
        display: flex;
        position: absolute;
        left: 0;
        color: ${colors.vaultCardWhite};
    }

    .vault-type {
        text-align: left;
        width: 160px;
        margin-right: 10px;
    }
    
    .MuiMenuItem-root {
        font-family: Ubuntu Mono;
    }

    .protocols {
        text-align: left;
        width: 160px;
    }

    .sort-buttons {
        display: flex;
        position: absolute;
        right: 0;

        .MuiSvgIcon-root {
            font-size: 2em;
        }
    }

    .tvl-button {
        border-radius: 3px;
        width:80px;
        height: 55px;
        color: white;
        font-family: Ubuntu Mono;
    }

    .tvl-button:hover {
        border: 1px white solid;
    }

    .apy-button {
        border-radius: 3px;
        width:80px;
        height: 55px;
        color: white;
    }

    .apy-button:hover {
        border: 1px white solid;
    }

    .multiplier-button {
        border-radius: 3px;
        width: 160px;
        height: 55px;
        color: white;
    }

    .multiplier-button:hover {
        border: 1px white solid;
    }

    .MuiSelect-icon {
        color: white;
    }
    
    // MOBILE

    @media screen and (max-width: 1300px) {
        .filter-box {
            width: 622px;
        }
    }

    @media screen and (max-width: 1000px) {
        .wrap{
            width: 90%;
            left: 0%;
        }

        .search {  
            width: 100%;
            display: flex;
        }

        .bottom-row {
            width: 90%;
            display: flex;
            height: 50%;
        }

        .dropdown-buttons {
            display: flex;
            position: relative;  
        }

        .vault-type {
            position: relative;
            width:190px;
        }
    
        .protocols {
            position: relative;
            width:190px;
        }

        .sort-buttons {
            top: 60%;
            position: absolute;
            display: flex;
            justify-content: center;
            left: 0;
        }

        .multiplier-button {
            margin-left: 10px;
            margin-right: 10px;
        }
    }

    @media screen and (max-width: 650px) {
        width: 100%;

        .filter-box {
            width: 95%;
            margin: 0 auto 20px;
            box-sizing: border-box;
        }
    }

    @media screen and (max-width: 530px) {
        .filter-box {
            height: fit-content;
        }

        .wrap {
            flex-direction: column;

            .search {
                margin-top: 10px;
            }

            .your-vault {
                justify-content: center;
                margin: 10px 0;
                font-size: 0.9em;
            }
        }

        .bottom-row {
            flex-direction: column;

            .dropdown-buttons {
                justify-content: center;
                margin-bottom: 10px;
            }

            .sort-buttons {
                position: static;
            }
        }
    }
}
`

const FilterBox = ({ 
    dispatch, 
    filters, 
    sortTVL, 
    setTVLSorting, 
    vaultType, 
    setVaultType, 
    setSearchValue, 
    setShowVaults, 
    showVaults, 
    protocolSelected, 
    setProtocolSelected 
}) => {
    const classes = useStyles()
    const outliedclasses = useOutlinedInputStyles()

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handeClickTVL = () => sortTVL ? setTVLSorting(false) : setTVLSorting(true);

    const handleVaultTypeChange = e => setVaultType(e.target.value);

    const handleChangeProtocols = e => {
        const {
            target: { value },
        } = e;
        console.log(value);
        if (value.length) {
            setProtocolSelected(typeof value === 'string' ? value.split(',') : value,);
        } else {
            setProtocolSelected(["All"]);
        }
    }

    const updateFilters = vaults => {
        setShowVaults(vaults);
        dispatch({ type: 'reset' });
    }

    const handleClick = protocol => {
        if (filters.includes(protocol)) {
            dispatch({ type: 'remove', name: protocol });
        } else {
            dispatch({ type: 'include', name: protocol });
        }
    }

    return (
        <Container>
            <div className="filter-box">
                <div className="wrap">
                    <div className="search">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search..."
                            onChange={event => {setSearchValue(event.target.value)}}
                        />  
                    </div>
                    <FormControlLabel
                        className="your-vault"
                        control={
                            <Checkbox
                                className="checkbox-style"
                                color="success"
                                disableRipple="true"
                                onChange={() => showVaults == 'all' ? updateFilters('mine') : updateFilters('all')}
                            />
                        }
                        label="My Vaults"
                    />
                </div>
                <div className="bottom-row"> 
                    <div className="dropdown-buttons">
                        <FormControl variant="outlined" className="vault-type">
                            <InputLabel
                                style={{
                                    color: colors.vaultCardWhite
                                }}
                            >
                                Vault Type
                            </InputLabel>
                            <Select
                                onChange={handleVaultTypeChange}
                                value={vaultType}
                                style={{color: colors.vaultCardWhite}}
                                input={<OutlinedInput label="Vaults Type" classes={outliedclasses}/>}
                                MenuProps={{
                                    classes: {
                                        list: classes.list
                                    },
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    },
                                    transformOrigin: {
                                        vertical: "top",
                                        horizontal: "left"
                                    },
                                    getContentAnchorEl: null,         
                            }}>
                                <MenuItem className="vault-type-menu-item" onClick={handleClose} value={"all"}>All</MenuItem>
                                <MenuItem className="vault-type-menu-item" onClick={handleClose} value={"single"}>Single staking</MenuItem>
                                <MenuItem className="vault-type-menu-item" onClick={handleClose} value={"stables"}>Stables</MenuItem>
                                <MenuItem className="vault-type-menu-item" onClick={handleClose} value={"lp"}>LP tokens</MenuItem>
                                <MenuItem className="vault-type-menu-item" onClick={handleClose} value={"cycle"}>CYCLE vaults</MenuItem>   
                            </Select>
                        </FormControl>         
                        <FormControl variant="outlined" className="protocols">
                            <InputLabel
                                style={{color: colors.vaultCardWhite}}
                            >
                                Protocols
                            </InputLabel>
                            <Select
                                multiple
                                onChange={handleChangeProtocols}
                                style={{
                                    color: colors.vaultCardWhite
                                }}
                                value={protocolSelected}
                                input={
                                    <OutlinedInput
                                        label="Protocols"
                                        classes={outliedclasses}
                                    />
                                }
                                MenuProps={{
                                    classes: {
                                        list: classes.protocolList
                                    },
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    },
                                    transformOrigin: {
                                        vertical: "top",
                                        horizontal: "left"
                                    },
                                    getContentAnchorEl: null,
                                    maxHeight: 55,
                                    color: colors.vaultCardWhite
                                }}
                                renderValue={(protocolSelected) => protocolSelected.join(', ')}                
                            >
                                {protocols.map(p => (  
                                    <MenuItem
                                        key={p.fullName}
                                        value={p.fullName}
                                        onClick={() => handleClick(p.protocol)}
                                    >
                                        <img
                                            style={{ 
                                                marginRight: "10px",
                                                width: "50px",
                                                height: "50px",
                                                borderRadius: "50%",
                                            }}
                                            src={p.image}
                                        />         
                                        {p.fullName} 
                                        <Checkbox
                                            className="checkbox-style"
                                            style={{
                                                color: colors.vaultCardWhite,
                                                position:"absolute",
                                                top:"50%",
                                                transform: "translateY(-50%)",
                                                right:"0"
                                            }}
                                            checked={filters.includes(p.protocol)}
                                        />
                                    </MenuItem>      
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="sort-buttons">
                        {/* <Button
                            id="basic-button"
                            onClick={handeClickTVL}
                            className="tvl-button"
                        >
                            {sortTVL ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>} 
                            TVL
                        </Button> */}
                        {/* <Button
                            id="basic-button"
                            className="multiplier-button"
                        >
                            Multiplier
                            <ArrowDropDownIcon/>
                        </Button> */}
                        {/* <Button
                            id="basic-button"
                            className="apy-button"
                        >
                            APY
                            <ArrowDropDownIcon/>
                        </Button> */}
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default FilterBox;
