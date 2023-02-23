// import axios from "axios";
interface ResponseData {
  responseData: {
    translatedText: string;
    match: number;
  }
}

export type WordsWithTranslation = {
  word: string
  translation: string
}

export const getTranslation = (words: string[] | string) => {
  if (Array.isArray(words)) {
    const unionWords = words.join(' | ')
    return requestTranslation(unionWords)
  }
  return requestTranslation(words)
}

export const listWordsWithTranslation = async (words: string[]) => {
  const textInSpanish = await getTranslation(words)
  try {
    const wordsInSpanish = textInSpanish.responseData.translatedText.split(' | ')
    console.log(wordsInSpanish);
    return words.map((word, i) => {
      return {
        translation: wordsInSpanish[i],
        word: word
      };
    });
  } catch (error) {
    console.log(error)
  }
}

const requestTranslation = async (text: string): Promise<ResponseData> => {
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c3632efc7amsh30d83ef32e8afdfp1961c8jsn6c8cb926eefd',
      'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
    },
  };
  const params = new URLSearchParams({
    langpair: 'en|es',
    q: text,
    mt: '1',
    onlyprivate: '0',
    de: 'a@b.c'
  })
  const apiUrl = `https://translated-mymemory---translation-memory.p.rapidapi.com/get?${params.toString()}`
  try {
    const response = await fetch(apiUrl, options);
    const responseJson: ResponseData = await response.json();
    console.log(responseJson)
    return responseJson;
  } catch (error) { return error; }
}