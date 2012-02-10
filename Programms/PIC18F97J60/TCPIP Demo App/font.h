#ifndef _FONT_H
#define _FONT_H

#ifdef _WINDOWS
#   include "..\..\guidance\stdafx.h"
#else
#   include "GenericTypeDefs.h"
#endif


#define ARIAL   0
#define ARIAL_B 1
#define ARIAL_B_MASK 0x03FF
#define ARIAL_MASK 0x00FF
#define SIZE_ARIAL_B 10
#define SIZE_ARIAL 8

WORD* GetSymbolImage(BYTE symbol,WORD* OutWordCount,BYTE CFont);
WORD* GetStringImage(BYTE* string, WORD* OutWordCount);
void InitFonts(void);
 

//#define ARIAL_B  0   //Arial_B
//#define ARIAL    0   //Arial_B

#endif //_FONT_H
