using System.ComponentModel.DataAnnotations;

namespace hr_rooster.Models{
  public class Rooms{
    [Key]
    public string Room { get; set; }
    public string Building { get; set; }
    public Institutes Institute { get; set; }
  }
}