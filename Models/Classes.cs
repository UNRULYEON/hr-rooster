using System.ComponentModel.DataAnnotations;

namespace hr_rooster.Models
{
  public class Classes{
    [Key]
    public string Class { get; set; }
    public Institutes Institute { get; set; }
  }
}