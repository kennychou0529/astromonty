
#include "GenericTypeDefs.h"
#include "DisplayBuffer.h"
#include "pcf8535.h"
#include "font.h"

#pragma udata DISPLAY0 =0x800
static BYTE DisplayBuffer0[256];
#pragma udata DISPLAY1 =0x900
static BYTE DisplayBuffer1[256];
#pragma udata DISPLAY2 =0xA00
static BYTE DisplayBuffer2[256];
#pragma udata DISPLAY3 =0xB00
static BYTE DisplayBuffer3[256];
#pragma udata DISPLAY4 =0xC00
static BYTE DisplayBuffer4[40];
#pragma udata
void DisplayInit()
{
    BYTE i;
    //������� ������ ������
    for(i=0;i<256;i++){
        DisplayBuffer0[i]=0;
        DisplayBuffer1[i]=0;
        DisplayBuffer2[i]=0;
        DisplayBuffer3[i]=0;
        if(i<40) DisplayBuffer4[i]=0;
    }
}

void DisplayDraw(BYTE addr)
{    
    LCDSetXY(addr,0,0);
    LCDSendData(addr, DisplayBuffer0,      128);
    LCDSendData(addr,&DisplayBuffer0[128], 128);
    LCDSendData(addr, DisplayBuffer1,      128);
    LCDSendData(addr,&DisplayBuffer1[128], 128);
    LCDSendData(addr, DisplayBuffer2,      128);
    LCDSendData(addr,&DisplayBuffer2[128], 128);
    LCDSendData(addr, DisplayBuffer3,      128);
    LCDSendData(addr,&DisplayBuffer3[128], 128);
    LCDSendData(addr, DisplayBuffer4,      40);
}
void WriteByteAtBank(BYTE Bank, BYTE Pos, BYTE Data,BYTE Mask)
{   
    WORD Address;
    WORD MemBank;
    WORD MemPos;
    BYTE Temp = 0;
    BYTE TempMask = 0xFF^Mask;
    
    if(Mask == 0) return;
    if(Bank>7) return;
    if(Pos>132) return;
    Address = Bank; 
    Address = Address*133+Pos;
    MemBank = (Address>>8);
    MemPos  = (Address&0x00FF);
    switch(MemBank){
        case 0: 
            Temp = DisplayBuffer0[MemPos]&TempMask;
            DisplayBuffer0[MemPos]=Temp|(Data&Mask);                
        break;
        case 1: 
            Temp = DisplayBuffer1[MemPos]&TempMask;
            DisplayBuffer1[MemPos]=Temp|(Data&Mask);                
        break;
        case 2: 
            Temp = DisplayBuffer2[MemPos]&TempMask;
            DisplayBuffer2[MemPos]=Temp|(Data&Mask);                
        break;
        case 3: 
            Temp = DisplayBuffer3[MemPos]&TempMask;
            DisplayBuffer3[MemPos]=Temp|(Data&Mask);                
        break;
        case 4: 
            Temp = DisplayBuffer4[MemPos]&TempMask;
            DisplayBuffer4[MemPos]=Temp|(Data&Mask);                
        break;
    }
    
}
void OutTextXY(BYTE X,BYTE Y,BYTE* Text)
{    
    BYTE  count;    
    BYTE i;
    BYTE  YBank = (Y >> 3);    
    BYTE  YPos  =  Y&0x07;  
    BYTE  XPos  = X;
    UINT16_VAL Mask;
    UINT16_VAL Data;
    BYTE  Data1;
    BYTE  Data2;
    BYTE  Data3;
    BYTE  Mask1;//^
    BYTE  Mask2;//=    
    BYTE  Mask3;//v
    WORD  FontMask = ARIAL_B_MASK;
    BYTE* ptr;
    WORD* Image;
    
    Mask.Val  = (FontMask<<YPos);
    Mask1 = Mask.byte.LB;
    Mask2 = Mask.byte.HB;
    Mask.Val  = (FontMask>>(16-YPos));
    Mask3 = Mask.byte.LB;
        
    ptr = Text;
    while ( *ptr ){
        Image = GetSymbolImage(*ptr++,&count);
        for(i=0;i<count;i++){
            Data.Val = *Image<<YPos;
            Data1 = Data.byte.LB;
            Data2 = Data.byte.HB;
            Data.Val  = (*Image>>(16-YPos));
            Data3 = Data.byte.LB;
            WriteByteAtBank(YBank,   XPos, Data1,Mask1);
            WriteByteAtBank(YBank+1, XPos, Data2,Mask2);
            WriteByteAtBank(YBank+2, XPos, Data3,Mask3);            
            XPos++;
            Image++;
        }
        //���������� ����� ���������
        WriteByteAtBank(YBank,   XPos, 0,Mask1);
        WriteByteAtBank(YBank+1, XPos, 0,Mask2);
        WriteByteAtBank(YBank+2, XPos, 0,Mask3);            
        XPos++;
    }    
}

