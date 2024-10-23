import { Box, Container, Icon, Text } from "@chakra-ui/react";
import { useState } from "react";
import { GiMicrophone } from "react-icons/gi";
import { IoIosAlbums, IoMdMusicalNotes } from "react-icons/io";
import '../App.css';
import ArtistRenderer from "../components/ArtistRenderer";
import SearchBar from "../components/SearchBar";
import { datasource } from "../datasource/data";
import { getTruncatedSearchedText } from "../helpers/string.helper";
import AlbumRenderer from "../components/AlbumRenderer";
import SongRenderer from "../components/SongRenderer";

type ISuggestion = {
    type: string;
    text: string;
    subText?: string | undefined;
    fullDescription?: string | undefined;
    length?: string | undefined
    artist?: any,
    albums?: any,
}


export default function MainPage() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<ISuggestion | null>(null)

    const onSearch = (text: string) => {
        setQuery(text)
        if (text.length >= 2) {
            const filteredSuggestions = getFilteredSuggestions(text);
            setShowSuggestions(true)
            setSuggestions(filteredSuggestions);
        } else {
            setShowSuggestions(false)
            setSuggestions([]);
        }
    };

    const getFilteredSuggestions = (input: string) => {
        const lowercaseInput = input.toLowerCase();

        return datasource.flatMap((artist) => {
            const albums = artist.albums.flatMap((album) => {
                const songs = album.songs.filter((song) =>
                    song.title.toLowerCase().includes(lowercaseInput)
                );
                return [
                    ...(album.title.toLowerCase().includes(lowercaseInput)
                        ? [{ type: 'album', text: album.title, artist, description: album.description, songs: album.songs }]
                        : []),
                    ...songs.map((song) => ({
                        artist,
                        type: 'song',
                        album,
                        text: `${song.title}`,
                        length: song.length
                    }))
                ];
            });

            const descriptionMatch = artist.albums.find((album) =>
                album.description.toLowerCase().includes(lowercaseInput)
            );

            return [
                ...(artist.name.toLowerCase().includes(lowercaseInput)
                    ? [{ type: 'artist', text: artist.name, albums: artist.albums }]
                    : []),
                ...albums,
                ...(descriptionMatch
                    ? [
                        {
                            artist,
                            type: 'album',
                            text: descriptionMatch.title,
                            description: descriptionMatch.description,
                            subText: getTruncatedSearchedText(descriptionMatch.description, lowercaseInput, 100),
                        }
                    ]
                    : [])
            ];
        });
    };

    const clearInput = () => {
        setShowSuggestions(false)
        setQuery('')
        setSuggestions([])
        setSelectedItem(null)
    }

    const onClickSuggestion = (item: ISuggestion) => {
        setQuery(item.text)
        setSelectedItem(item)
        setShowSuggestions(false)
    }

    const highlightMatch = (text: string, query: string, fontSize = "md", color = 'black') => {
        const index = text?.toLowerCase().indexOf(query.toLowerCase());

        if (index === -1) {
            return <Text>{text}</Text>;
        }

        const beforeMatch = text.substring(0, index);
        const match = text.substring(index, index + query.length);
        const afterMatch = text.substring(index + query.length);

        return (
            <Text as="span" fontSize={fontSize} color={color}>
                {beforeMatch}
                <Text as="span" textDecoration="underline" fontWeight="bold" color="blue.600">
                    {match}
                </Text>
                {afterMatch}
            </Text>
        );
    };

    console.log('selectedItem : ', selectedItem)

    return (
        <div className="main">
            <SearchBar
                value={query}
                onValueChange={onSearch}
                placeholder="Search musicians, albums, or songs..."
                onClearInput={clearInput}
                suggestions={suggestions}
                suggestionsVisible={showSuggestions}
                renderSuggestions={(item: ISuggestion, index: number) => {
                    return (
                        <Container
                            onClick={() => onClickSuggestion(item)}
                            key={index}
                            cursor={"pointer"} py={"2"} px={"4"} display={'flex'} alignItems={'center'} _hover={{ bg: "#e5e5e5" }} mx={0} w={'full'} maxW={'full'}
                            borderBottomWidth={1}
                            borderBottomColor={'lightgray'}
                        >
                            {item.type == "album" &&
                                <Icon as={IoIosAlbums} />
                            }
                            {item.type == "artist" &&
                                <Icon as={GiMicrophone} />
                            }
                            {item.type == "song" &&
                                <Icon as={IoMdMusicalNotes} />
                            }
                            {item.type == "description" &&
                                <Icon as={IoIosAlbums} />
                            }
                            <Box ml={4} display={'flex'} flexDirection={'column'}>
                                {highlightMatch(item.text, query)}
                                {item.subText && highlightMatch(item.subText, query, 'sm', 'gray')}
                            </Box>
                        </Container>
                    )
                }}
            />
            {selectedItem != null &&
                <Box maxW="2xl" width="full" marginTop="10" bg={'#e5e5e5'} rounded={'lg'} p={'8'}>
                    {selectedItem?.type == 'artist' &&
                        <ArtistRenderer data={selectedItem} />
                    }
                    {selectedItem?.type == 'album' &&
                        <AlbumRenderer data={selectedItem} />
                    }
                    {selectedItem?.type == 'song' &&
                        <SongRenderer data={selectedItem} />
                    }
                </Box>}
        </div >
    )
}
