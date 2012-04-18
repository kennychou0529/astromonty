unit LogForm;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls, Menus, Grids;

type
  TForm3 = class(TForm)
    Memo1: TMemo;
    SaveDialog1: TSaveDialog;
    MainMenu1: TMainMenu;
    N1: TMenuItem;
    N2: TMenuItem;
    N3: TMenuItem;
    N4: TMenuItem;
    Label1: TLabel;
    OpenDialog1: TOpenDialog;
    procedure N2Click(Sender: TObject);
    procedure N4Click(Sender: TObject);
  private
    { Private declarations }
    FLine : integer;
  public
    { Public declarations }
  end;

var
  Form3: TForm3;

implementation

{$R *.dfm}
  
procedure TForm3.N2Click(Sender: TObject);
begin
    if(SaveDialog1.Execute) then
    begin
       Memo1.Lines.SaveToFile(SaveDialog1.FileName); 
    end;
end;

procedure TForm3.N4Click(Sender: TObject);
begin
    Visible := false;
end;

end.
